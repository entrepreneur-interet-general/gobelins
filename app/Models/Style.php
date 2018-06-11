<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Style extends Model
{
    protected $fillable = [
        'name',
        'legacy_id',
    ];

    /* Relations */

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
