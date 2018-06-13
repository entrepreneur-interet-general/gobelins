<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\Mappable;
use Kalnoy\Nestedset\NodeTrait;

class Material extends Model
{
    use Mappable, NodeTrait;

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }
}
