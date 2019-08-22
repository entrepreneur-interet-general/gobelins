<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use \App\Models\Selection;
use \App\Models\Product;
use \App\User;

class SelectionsController extends Controller
{
    private function listMySelections(Request $request)
    {
        $user = Auth::user() ?? Auth::guard('api')->user();
        $mySelections = $user ?
        $user->selections()->orderBy('updated_at', 'DESC')->with(['products', 'users'])->get()->map(function ($s) {
            return $s->toSearchableArray();
        }) : [];
        return $mySelections;
    }

    private function listMobNatSelections(Request $request)
    {
        $mob_nat_user = User::where('identity_code', User::IDENTITY_MOBILIER_NATIONAL)->first();

        $userSelections = $mob_nat_user->selections()->public()->orderBy('updated_at', 'DESC')->with(['products', 'users'])->get()->map(function ($s) {
            return $s->toSearchableArray();
        });
        return $userSelections;
    }

    private function listUserSelections(Request $request)
    {
        $userSelections = Selection::with(['products', 'users'])
                    ->public()
                    ->whereHas('users', function ($q) {
                        // FIXME. Negative doesn't work:
                        // identity_code <> User::IDENTITY_MOBILIER_NATIONAL
                        $q->where('identity_code', null);
                    })
                    ->orderBy('selections.updated_at', 'DESC')
                    ->limit(10)
                    ->get()->map(function ($s) {
                        return $s->toSearchableArray();
                    });
        return $userSelections;
    }

    private function listAllSelections(Request $request)
    {
        return [
            'mySelections' => $this->listMySelections($request),
            'mobNatSelections' => $this->listMobNatSelections($request),
            'userSelections' => $this->listUserSelections($request),
        ];
    }

    public function index(Request $request)
    {
        return $this->listAllSelections($request);
    }

    public function mine(Request $request)
    {
        return ['mySelections' =>$this->listMySelections($request)];
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
        }

        return ['mySelections' => $this->listMySelections()];
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
        
        $selection->products()->attach($product);

        return ['mySelections' => $this->listMySelections()];
    }


    public function show(Request $request, $selection_id)
    {
        $selection = Selection::findOrFail($selection_id);

        // $this->authorize('view', $selection);

        return view('site.selection', [
            'selection' => $selection,
        ]);
    }
}
