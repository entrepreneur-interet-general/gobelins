<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use SEO;

use App\Models\Product;

class ProductController extends Controller
{
    public function show($inventory_id)
    {
        $product = Product::published()->byInventory($inventory_id)->firstOrFail();
        return response()->json([
            'product' => $product->toSearchableArray(),
        ]);
    }
}
