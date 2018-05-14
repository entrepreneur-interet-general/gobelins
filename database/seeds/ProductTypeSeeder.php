<?php

use Illuminate\Database\Seeder;
use \App\Models\ProductType;

class ProductTypeSeeder extends Seeder
{
    /**
     * Seed the database with our custom ProductType taxonomy.
     *
     * @return void
     */
    public function run()
    {
        $product_types = file(__DIR__ . '/product_types.csv', FILE_IGNORE_NEW_LINES);
        collect($product_types)->map(function ($product_type_key) {
            $types_arr = explode(' > ', $product_type_key);
            if (sizeof($types_arr) === 1) {
                ProductType::create([
                    'name' => $product_type_key,
                    'mapping_key' => $product_type_key,
                ]);
            } else {
                $parent_type_keys = collect($types_arr);
                $name = $parent_type_keys->pop();
                $parent_type_key = $parent_type_keys->implode(' > ');
                $parent = ProductType::where('mapping_key', $parent_type_key)->first();
                ProductType::create([
                    'name' => $name,
                    'mapping_key' => $product_type_key,
                    'parent_id' => $parent->id,
                ]);
            }
        });
    }
}
