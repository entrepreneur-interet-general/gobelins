<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function show($inventory_id)
    {
        $product = Product::byInventory($inventory_id)->firstOrFail();
        return response()->json([
            'product' => $product->toSearchableArray(),
        ]);
    }
}
