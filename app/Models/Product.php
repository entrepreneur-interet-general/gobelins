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

    // Accessors

    public function getMaterialsWithAncestorsAttribute()
    {
        return $this->materials->map(function ($m) {
            return \App\Models\Material::ancestorsAndSelf($m->id)->all();
        })->flatten()->unique('id');
    }

    /**
     * Get all the related Materials in a flat array,
     * with the directly related items marked as leaves.
     *
     * @return array
     */
    public function getSearchableMaterialsAttribute()
    {
        return $this->materials->map(function ($mat) {
            return $mat->toSearchableAncestorsAndSelf();
        })->flatten(1)->unique('id')->all();
    }

    public function getSearchableProductTypesAttribute()
    {
        return $this->productType->toSearchableAncestorsAndSelf();
    }

    public function getSearchableAuthorsAttribute()
    {
        return $this->authors->map(function ($author) {
            return $author->toSearchableArray();
        })->all();
    }

    public function getSearchableImagesAttribute()
    {
        return $this->images->map(function ($image) {
            return $image->toSearchableArray();
        })->all();
    }

    public function getSearchableStyleAttribute()
    {
        return $this->style ? $this->style->toSearchableArray() : [];
    }

    public function getSearchableProductionOriginAttribute()
    {
        return $this->productionOrigin ? $this->productionOrigin->toSearchableArray() : [];
    }


    // Fillables

    protected $fillable = [
        'inventory_id',
        'inventory_root',
        'inventory_number',
        'inventory_suffix',
        'height_or_thickness',
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


    // Eloquent scopes

    public function scopeByInventory($query, $inventory)
    {
        $query->where('inventory_id', '=', $inventory);
    }

    // Temporary addition for demo purposes.
    // Todo: get score from source data (SCOM), or
    // fine tune the image quality criteria.
    public function getImageQualityScoreAttribute()
    {
        if ($this->images && sizeof($this->images) > 0) {
            if (strstr($this->images[0]->path, 'BIDEAU')) {
                return 3;
            } else {
                return 2;
            }
        } else {
            return 0;
        }
    }


    /**
     * Get the indexable data array for the model.
     * This data will be stored in Elasticsearch.
     *
     * @return array
     */
    public function toSearchableArray()
    {
        return [
            'title_or_designation' => $this->title_or_designation,
            'denomination' => $this->denomination,
            'description' => $this->description,
            'bibliography' => $this->bibliography,
            'inventory_id' => $this->inventory_id,
            'product_types' => $this->searchableProductTypes,
            'authors' => $this->searchableAuthors,
            'period_name' => $this->period ? $this->period->name : null,
            'period_start_year' => $this->period ? $this->period->start_year : null,
            'period_end_year' => $this->period ? $this->period->end_year : null,
            'conception_year' => $this->conception_year,
            'images' => $this->searchableImages,
            'image_quality_score' => $this->imageQualityScore,
            'style' => $this->searchableStyle,
            'materials' => $this->searchableMaterials,
            'production_origin' => $this->searchableProductionOrigin,
            'length_or_diameter' => $this->length_or_diameter,
            'depth_or_width' => $this->depth_or_width,
            'height_or_thickness' => $this->height_or_thickness,
        ];
    }
}
