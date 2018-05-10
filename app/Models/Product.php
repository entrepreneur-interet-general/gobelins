<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    // Eloquent relationships

    public function authorships()
    {
        return $this->hasMany(Authorship::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function period()
    {
        return $this->belongsTo(Period::class);
    }

    public function legacyInventoryNumbers()
    {
        return $this->hasMany(LegacyInventoryNumber::class);
    }

    public function productType()
    {
        return $this->belongsTo(ProductType::class);
    }
}
