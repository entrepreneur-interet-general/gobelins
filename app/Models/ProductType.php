<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\Mappable;
use Kalnoy\Nestedset\NodeTrait;

/**
 * A ProductType is based on the SCOM 'gracat' (Grandes catégories).
 */
class ProductType extends Model
{
    use Mappable;
    use NodeTrait;

    /* Relations */

    public function products()
    {
        return $this->hasMany(Product::class);
    }
        

    // public function getParentsAttribute()
    // {
    //     $parents = collect([]);
    //     $parent = $this->parent;

    //     while (!is_null($parent)) {
    //         $parents->push($parent);
    //         $parent = $parent->parent;
    //     }

    //     return $parents;
    // }

    // public function getBranchIdsAttribute()
    // {
    //     return $this->parents->map(function ($pt) {
    //         return $pt->id;
    //     })->prepend($this->id)->toArray();
    // }
}
