<?php

namespace App\Models;

use A17\Twill\Models\Model;
use App\Models\Traits\Mappable;
use Kalnoy\Nestedset\NodeTrait;

/**
 * A ProductType is based on the SCOM 'gracat' (Grandes catégories).
 */
class ProductType extends Model
{
    use Mappable;
    use NodeTrait;

    protected $touches = ['products'];

    protected $visible = ['name', 'id', 'children'];

    /* Relations */

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function getBranchIdsAttribute()
    {
        return self::ancestorsAndSelf($this->id)->pluck('id')->toArray();
    }

    /**
     * Data to store in Elasticsearch.
     *
     * @return array
     */
    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'mapping_key' => $this->mapping_key,
            'is_leaf' => false, // Default
        ];
    }

    /**
     * Searchable data of a product type and all
     * it's ancestors. The instance this method is called
     * from is marked as a "leaf".
     *
     * @return array
     */
    public function toSearchableAncestorsAndSelf()
    {
        $leaf = $this->toSearchableArray();
        $leaf['is_leaf'] = true;
        return $this->ancestors->map(function ($anc) {
            return $anc->toSearchableArray();
        })->prepend($leaf)->all();
    }

}
