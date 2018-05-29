<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * A ProductType is based on the SCOM 'gracat' (Grandes catégories).
 */
class ProductType extends Model
{
    /* Relations */

    public function products()
    {
        return $this->hasMany(Product::class);
    }
    
    public function children()
    {
        return $this->hasMany(ProductType::class, 'parent_id', 'id');
    }
    
    public function parent()
    {
        return $this->hasOne(ProductType::class, 'id', 'parent_id');
    }
    

    /* Scopes */

    public function scopeLegacyType($query, $legacyProductType)
    {
        $mapping_key = self::mappingFrom($legacyProductType);
        return $query->where('mapping_key', $mapping_key);
    }


    /* Mappings */
    
    private static $mappings = [];

    private static function mappings()
    {
        if (self::$mappings) {
            return self::$mappings;
        }
        $sheet = file(base_path() . '/database/mappings/product_types.tsv', FILE_IGNORE_NEW_LINES);
        $mappings = collect($sheet)->mapWithKeys(function ($line) {
            list($key, $val) = explode("\t", $line);
            return [$key => $val];
        })->filter(function ($val, $key) {
            return $val !== '';
        })->toArray();
        self::$mappings = $mappings;
        return $mappings;
    }
    
    public static function mappingFrom($legacyProductType)
    {
        self::mappings();
        return array_key_exists($legacyProductType, self::$mappings) ? self::$mappings[$legacyProductType] : null;
    }

    public function getParentsAttribute()
    {
        $parents = collect([]);
        $parent = $this->parent;

        while (!is_null($parent)) {
            $parents->push($parent);
            $parent = $parent->parent;
        }

        return $parents;
    }

    public function getBranchIdsAttribute()
    {
        return $this->parents->map(function ($pt) {
            return $pt->id;
        })->prepend($this->id)->toArray();
    }
}
