<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Selection extends Model
{
    protected $fillable = [
        'name',
        'description',
        'public',
    ];

    protected $visible = ['name', 'id', 'public', 'description', 'users', 'products'];

    protected $with = ['products'];

    protected $attributes = [
        'public' => true, // Default value.
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function notMobNatUsers()
    {
        return $this->belongsToMany(User::class)->where('identity_code', '<>', User::IDENTITY_MOBILIER_NATIONAL);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }

    public function scopePublic($query)
    {
        return $query->where('public', true);
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
