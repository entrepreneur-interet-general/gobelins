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

    public function getBranchIdsAttribute()
    {
        return self::ancestorsAndSelf($this->id)->pluck('id')->toArray();
    }
}
