<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use ES;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        // $results = \App\Models\Product::search($request->input('q'))->get();
        $results = ES::type("products")->search($request->input('q'))->get();
        return view('site.search', [
            'query' => $request->input('q'),
            'results' => $results,
        ]);
    }
}
