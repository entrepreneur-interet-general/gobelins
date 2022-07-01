<?php

namespace App\Models;

use App\Models\Image;
use App\Models\Product;
use App\User;
use Illuminate\Database\Eloquent\Model;

class Selection extends Model
{
    protected $fillable = [
        'name',
        'description',
        'public',
    ];

    protected $visible = ['name', 'id', 'public', 'description', 'users', 'products'];

    // protected $with = ['products'];

    protected $attributes = [
        'public' => false, // Default value.
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function invitations()
    {
        return $this->hasMany(Invitation::class);
    }

    public function notMobNatUsers()
    {
        return $this->belongsToMany(User::class)->where('identity_code', '<>', User::IDENTITY_MOBILIER_NATIONAL);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }

    /**
     * A selection has between 0 and 4 images of products
     * used to represent it in listing views.
     */
    public function images()
    {
        return $this->belongsToMany(Image::class)->withPivot('order')->orderBy('order');
    }

    public function collectPosterIds()
    {
        $ids = [];
        $this->products
        // ->sortByDesc('image_quality_score')
            ->each(function ($p) use (&$ids) {
                if (sizeof($ids) < 4) {
                    $image = $p->posterImage;
                    if ($image) {
                        array_push($ids, $image->id);
                    }
                } else {
                    return false;
                }
            });
        return collect($ids);
    }

    public function refreshPosterImages()
    {
        $increment = 0;
        $ordered_ids = $this->collectPosterIds()->mapWithKeys(function ($id) use (&$increment) {
            $increment++;
            return [$id => ['order' => $increment]];
        })->all();
        return $this->images()->sync($ordered_ids);
    }

    public function scopePublic($query)
    {
        return $query->where('public', true);
    }

    public function getPosterImagesAttribute()
    {
        return $this->images()
            ->where('images.is_published', true)
            ->orderBy('images.is_prime_quality')
            ->limit(4)->get();
    }

    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'public' => $this->public,
            'users' => $this->users()->select('id', 'name', 'email')->get()->all(),
            'invitations' => $this->invitations->map(function ($inv) {
                return $inv->toArray();
            }),
            'products' => $this->products->map(function ($p) {
                return $p->toSearchableArray();
            }),
        ];
    }
}
