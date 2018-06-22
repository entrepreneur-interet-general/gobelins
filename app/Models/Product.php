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
        return $this->belongsToMany(Author::class, 'authorships')->using(Authorship::class);
    }

    public function getAuthorIdsAttribute()
    {
        return $this->authors->pluck('id')->all();
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
    
    public function style()
    {
        return $this->belongsTo(Style::class);
    }

    public function materials()
    {
        return $this->belongsToMany(Material::class);
    }

    public function productionOrigin()
    {
        return $this->belongsTo(ProductionOrigin::class);
    }

    public function getMaterialIdsAttribute()
    {
        if ($this->materials && sizeof($this->materials) > 0) {
            return $this->materials->map(function ($m) {
                return $m->ancestors->pluck('id')->prepend($m->id)->all();
            })->flatten()->all();
        } else {
            return [];
        }
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
        'style_id',
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
            'author_ids' => $this->authorIds,
            'period_start_year' => $this->period ? $this->period->start_year : null,
            'period_end_year' => $this->period ? $this->period->end_year : null,
            'conception_year' => $this->conception_year,
            'images' => $this->images->map(function ($img) {
                return [
                    'path' => $img->path,
                    'width' => $img->width,
                    'height' => $img->height,
                ];
            })->toArray(),
            'style_id' => $this->style ? $this->style->id : null,
            'material_ids' => $this->materialIds,
            'production_origin_id' => $this->productionOrigin ? $this->productionOrigin->id : null,
        ];
    }

    public function scopeByInventory($query, $inventory)
    {
        $query->where('inventory_id', '=', $inventory);
    }
}
