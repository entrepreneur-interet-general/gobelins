<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Product extends Model
{
    use Searchable;

    // Eloquent relationships

    public function authorships()
    {
        return $this->hasMany(Authorship::class);
    }

    public function authors()
    {
        return $this->hasManyThrough(Author::class, Authorship::class);
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
        return $this->belongsTo(ProductType::class)->withDefault(function ($product) {
            $product->branchIds = [];
        });
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

    /**
     * Get the indexable data array for the model.
     *
     * @return array
     */
    public function toSearchableArray()
    {
        return [
            'title_or_designation' => $this->title_or_designation,
            'description' => $this->description,
            'inventory_id' => $this->inventory_id,
            'product_type_ids' => $this->productType->branchIds,
        ];
    }
}
