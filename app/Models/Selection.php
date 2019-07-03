<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Selection extends Model
{
    protected $fillable = [
        'name',
        'description',
        'public',
    ];

    protected $visible = ['name', 'id', 'public', 'description', 'users', 'products'];

    protected $with = ['products'];

    public function users()
    {
        return $this->belongsToMany(\App\User::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }

    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'public' => $this->public,
            'users' => $this->users,
            'products' => $this->products->map(function ($p) {
                return $p->toSearchableArray();
            }),
        ];
    }
}
