<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = [
        'path',
        'width',
        'height',
        'is_published',
        'is_poster',
        'is_prime_quality',
        'is_documentation_quality',
        'has_privacy_issue',
        'has_marking',
        'is_reviewed',
    ];

    protected $touches = ['product'];
    
    protected $hidden = [
        'pivot' // Hide from toArray()
    ];

    // Maps the directory name to a human name.
    const IDENTIFIED_PHOTOGRAPHERS = [
        'BERSANI' => 'Marie-Hélène Bersani',
        'BIDEAU' => 'Isabelle Bideau',
        // 'BOHL' => 'Thomas Bohl',
        'BROUILLET' => 'Stéphanie Brouillet',
        // 'CAVALIE' => 'Hélène Cavalié',
        'CINQPEYRES' => 'Muriel Cinqpeyres',
        'DELAMOTTE' => 'Céline Delamotte',
        'DENIS' => 'Arnaud Denis',
        // 'GAUTIER' => 'Jean-Jacques Gautier',
        'GLOMET' => 'Valérie Glomet',
        'ISAKOVITCH' => 'Sandra Isakovitch',
        'MANCEL' => 'Nicolas Mancel',
        'MONTAGNE' => 'Lucile Montagne',
        // 'SARASA' => 'Marina Sarasa',
        'THARAUD' => 'Marie-Amélie Tharaud',
    ];
    
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
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
            'photographer' => $this->photographer,
            'is_poster' => $this->is_poster,
            'is_prime_quality' => $this->is_prime_quality,
            'is_documentation_quality' => $this->is_documentation_quality,
            'has_marking' => $this->has_marking,
            'license' => $this->license,
        ];
    }

    /**
     * Photographer's name
     * Derive the name of the photographer from the storage path.
     *
     * @return string|null
     */
    public function getPhotographerAttribute()
    {
        $re = '/(' . collect(self::IDENTIFIED_PHOTOGRAPHERS)->keys()->implode('|') . ')/';
        if (preg_match($re, $this->path, $matches) > 0) {
            return self::IDENTIFIED_PHOTOGRAPHERS[$matches[1]];
        }
        return null;
    }

    /**
     * Distribution license
     * Only the production of internal photographers, of objects that have fallen
     * in the public domain, can be (at this point) safely licensed as License
     * Ouverte 2.0.
     *
     * @return string|null
     */
    public function getLicenseAttribute()
    {
        $public_domain_horizon = getdate()['year'] - 70;
        if ($this->photographer && preg_match('/CINQPEYRES|BIDEAU/i', $this->photographer) > 0) {
            if ($this->product && (
                ($this->product->period && $this->product->period->end_year && $this->product->period->end_year < $public_domain_horizon) ||
                ($this->product->conception_year && $this->product->conception_year < $public_domain_horizon)
            )) {
                return 'LO 2.0';
            }
        }
        return null;
    }
}
