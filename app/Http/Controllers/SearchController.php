<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductType;
use App\Models\Author;
use ES;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = ES::type("products");
        
        $product_types = ProductType::all();
        $product_type_ids = [];
        if (is_array($request->input('product_type_ids'))) {
            $product_type_ids = $request->input('product_type_ids');
            $query = $query->whereIn('product_type_ids', $product_type_ids);
        }

        $authors = Author::orderBy('name', 'asc')->get();
        $author_ids = [];
        if (is_array($request->input('author_ids'))) {
            $author_ids = $request->input('author_ids');
            $query = $query->whereIn('author_ids', $author_ids);
        }
        
        if ($request->input('q')) {
            $query = $query->search($request->input('q'));
        }


        return view('site.search', [
            'query' => $request->input('q'),
            'es_query' => $query->getBody(),
            'product_types' => $product_types,
            'product_type_ids' => $product_type_ids,

            'authors' => $authors,
            'author_ids' => $author_ids,
            
            'results' => $query->take(15)->get(),
        ]);
    }
}
