<?php

namespace App\Models;

use A17\Twill\Models\Model;

class EntryMode extends Model
{
    protected $fillable = [
        'legacy_id',
        'name',
    ];

    protected $touches = ['products'];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    /**
     * To store in Elasticsearch.
     *
     * @return array
     */
    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
        ];
    }
}
