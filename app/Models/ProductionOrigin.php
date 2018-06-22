<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\Mappable;

class ProductionOrigin extends Model
{
    use Mappable;
    
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
