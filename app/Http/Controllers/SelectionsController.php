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
        $selections = Auth::user()->selections()->with(['products', 'users'])->get()->map(function ($s) {
            return $s->toSearchableArray();
        });
        return ['selections' => $selections];
    }

    public function index(Request $request)
    {
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
