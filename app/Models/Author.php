<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    protected $fillable = [
        'legacy_id',
        'name',
    ];

    public function authorships()
    {
        return $this->hasMany(Authorship::class);
    }
    
    public function products()
    {
        return $this->hasManyThrough(Product::class, Authorship::class);
    }
}
