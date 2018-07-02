<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = [
        'path',
        'width',
        'height',
    ];
    
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
            'path' => $this->path,
            'width' => $this->width,
            'height' => $this->height,
        ];
    }
}
