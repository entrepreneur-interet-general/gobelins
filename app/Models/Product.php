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

    // Fillables

    protected $fillable = [
        'inventory_id',
        'inventory_root',
        'inventory_number',
        'inventory_suffix',
        'length_or_diameter',
        'depth_or_width',
        'conception_year',
        'acquisition_origin',
        'acquisition_date',
        'listed_as_historic_monument',
        'listed_on',
        'category',
        'denomination',
        'title_or_designation',
        'description',
        'bibliography',
    ];
}
