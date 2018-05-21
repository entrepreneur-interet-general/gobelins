<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LegacyInventoryNumber extends Model
{
    protected $fillable = [
        'number',
        'comment',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
