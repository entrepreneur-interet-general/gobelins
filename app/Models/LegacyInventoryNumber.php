<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LegacyInventoryNumber extends Model
{
    protected $fillable = [
        'number',
        'comment',
    ];

    protected $touches = ['product'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Data stored in Elasticsearch
     *
     * @return array
     */
    public function toSearchableArray()
    {
        return [
            'number' => $this->number,
            'comment' => $this->comment,
        ];
    }
}
