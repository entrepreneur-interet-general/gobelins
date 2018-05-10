<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Period extends Model
{
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
