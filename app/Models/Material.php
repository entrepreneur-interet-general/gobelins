<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\Mappable;
use Kalnoy\Nestedset\NodeTrait;

class Material extends Model
{
    use Mappable;
    use NodeTrait;

    protected $touches = ['products'];

    protected $visible = ['name', 'id', 'children'];

    public function products()
    {
        return $this->belongsToMany(Product::class);
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
     * Searchable data of a material and all
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
