<?php

namespace App\Models;

use A17\Twill\Models\Model;

class Period extends Model
{
    protected $fillable = [
        'legacy_id',
        'name',
        'start_year',
        'end_year',
    ];

    protected $touches = ['products'];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
