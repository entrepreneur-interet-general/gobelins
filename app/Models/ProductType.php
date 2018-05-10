<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductType extends Model
{
    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function children()
    {
        return $this->hasMany(ProductType::class, 'parent_id', 'id');
    }

    public function parent()
    {
        return $this->hasOne(ProductType::class, 'id', 'parent_id');
    }
}
