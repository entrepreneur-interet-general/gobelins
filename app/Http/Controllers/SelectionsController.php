<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use \App\Models\Selection;
use \App\Models\Invitation;
use \App\Models\Product;
use \App\User;
use \App\Http\Resources\ListedSelection;
use \App\Http\Resources\Selection as SelectionResource;

class SelectionsController extends Controller
{
    private function listAllSelections()
    {
        return [
            'mySelections' => $this->listMySelections(),
            'mobNatSelections' => $this->listMobNatSelections(),
            'userSelections' => $this->listUserSelections(),
        ];
    }

    public function index(Request $request)
    {
        return $this->listAllSelections($request);
    }

    public function listMySelections()
    {
        $user = Auth::user() ?? Auth::guard('api')->user();

        if ($user) {
            $selections = $user->selections()
                               ->orderBy('updated_at', 'DESC')
                               ->with(['users:id,name'])
                               ->paginate(4);
            return ListedSelection::collection($selections);
        } else {
            return ListedSelection::collection([]);
        }
    }
    
    public function listMobNatSelections()
    {
        $mn_user = User::where('identity_code', User::IDENTITY_MOBILIER_NATIONAL)->first();

        $selections = $mn_user->selections()
                              ->public()
                              ->orderBy('updated_at', 'DESC')
                              ->with('users:id,name,email')
                              ->paginate(4);

        return ListedSelection::collection($selections);
    }

    public function listUserSelections(Request $request)
    {
        $selections = Selection::with('users:id,name,email')
                        ->public()
                        ->whereDoesntHave('users', function ($q) {
                            $q->where('identity_code', User::IDENTITY_MOBILIER_NATIONAL);
                        })
                        ->orderBy('selections.updated_at', 'DESC')
                        ->paginate(4);
        return ListedSelection::collection($selections);
    }



    public function mine(Request $request)
    {
        return ['mySelections' =>$this->listMySelections()];
    }

    public function mineShort()
    {
        $user = Auth::user() ?? Auth::guard('api')->user();
        $mySelections = $user ?
        $user->selections()->select('id', 'name', 'public')->orderBy('updated_at', 'DESC')->get()->all() : [];
        return ['mySelectionsShort' => $mySelections];
    }



    /**
     * Create a selection.
     *
     * @param  Request  $request
     * @return Response
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */

    public function create(Request $request)
    {
        $this->authorize('create', Selection::class);

        $request->validate([
            'selection' => 'required',
            'selection.name' => 'required|max:255',
            'product_ids' => 'nullable|array',
            'product_ids.*' => 'integer',
        ]);
        
        $selection = new Selection;
        $selection->name = $request->selection['name'];
        $selection->save();
        $selection->users()->attach(Auth::user());

        if ($request->product_ids) {
            $selection->products()->attach($request->product_ids);
            $selection->refreshPosterImages();
        }

        return [
            'selection' => $selection,
            'mySelections' => $this->listMySelections()
        ];
    }

    /**
     * Add a product to a given selection.
     *
     * @param  Request  $request
     * @param  Integer  $selection_id
     * @param  Integer  $product_id
     * @return Response
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */

    public function add(Request $request, $selection_id, $product_id)
    {
        $selection = Selection::findOrFail($selection_id);
        $product = Product::findOrFail($product_id);

        $this->authorize('update', $selection);
        
        $selection->products()->syncWithoutDetaching([$product->id]);

        $selection->refreshPosterImages();

        // return ['mySelections' => $this->listMySelections()];
        return ['status' => 'ok'];
    }


    public function update(Request $request, $selection_id)
    {
        $selection = Selection::findOrFail($selection_id);

        $this->authorize('update', $selection);
        
        $selection->name = $request->name;
        $selection->description = $request->description;
        $selection->public = $request->public;

        $selection->save();

        return new SelectionResource($selection);
    }


    public function destroy(Request $request, $selection_id)
    {
        $selection = Selection::findOrFail($selection_id);

        $this->authorize('update', $selection);
        
        $selection->users()->detach();
        $selection->products()->detach();
        $selection->delete();

        return ['mySelections' => $this->listMySelections()];
    }


    /**
     * Remove a product from a given selection.
     *
     * @param  Request  $request
     * @param  Integer  $selection_id
     * @param  String   $inventory_id
     * @return Response
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */

    public function removeProduct(Request $request, $selection_id, $inventory_id)
    {
        $selection = Selection::findOrFail($selection_id);
        $product = Product::byInventory($inventory_id)->firstOrFail();

        $this->authorize('update', $selection);
        
        $selection->products()->detach($product->id);

        $selection->refreshPosterImages();

        // return ['mySelections' => $this->listMySelections()];
        return ['status' => 'ok'];
    }


    public function show(Request $request, $id)
    {
        $selection = Selection::findOrFail($id);

        $user = $request->user('api') ?: $request->user('web');

        if (!$selection->public && $user) {
            $user->can('view', $selection);
        }

        if ($request->expectsJson()) {
            return new SelectionResource($selection);
        } else {
            return view('site.selection', ['selection' => $selection]);
        }
    }

    /***
     * Remove a collaborator from a selection.
     */
    public function detachUser(Request $request, $selection_id, $user_id)
    {
        $selection = Selection::findOrFail($selection_id);
        
        $this->authorize('uninvite', $selection);
        
        $selection->users()->detach($user_id);

        return response()->json(['status' => 'ok']);
    }

    /**
     * Invitation landing
     * Users will hit this action when clicking on an invitation
     * link in an email. This action is guarded by auth middleware.
     * The idea is to authentitcate them (login or register), and
     * then redirect them to the normal selection detail page.
     */
    public function invitation(Request $request, $selection_id)
    {
        if ($request->session()->has('accepted_invitation')) {
            $invitation = Invitation::where('token', session('accepted_invitation'))->firstOrFail();

            // Add the user as a collaborator on the selection.
            $selection = $invitation->selection;
            if (! $selection->users->contains($request->user()->id)) {
                $selection->users()->attach($request->user()->id);
            }

            $request->session()->flash('status', 'Bienvenue, ' . $request->user()->name . ' ! Vous pouvez désormais participer à cette sélection.');


            $invitation->delete();

            $request->session()->forget('accepted_invitation');
        }
        return redirect(route('selection_detail', ['selection_id' => $selection_id]));
    }
}
