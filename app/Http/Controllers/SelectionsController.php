<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use \App\Models\Selection;
use \App\Models\Product;

class SelectionsController extends Controller
{
    private function listSelections()
    {
        $selections = Auth::user()->selections()->orderBy('updated_at', 'DESC')->with(['products', 'users'])->get()->map(function ($s) {
            return $s->toSearchableArray();
        });
        return ['selections' => $selections];
    }

    public function index(Request $request)
    {
        return $this->listSelections();
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

        return $this->listSelections();
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

        return $this->listSelections();
    }
}
