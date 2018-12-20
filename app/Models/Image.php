<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = [
        'path',
        'width',
        'height',
        'photographer',
    ];

    protected $touches = ['product'];

    // Maps the directory name to a human name.
    const IDENTIFIED_PHOTOGRAPHERS = [
        'BERSANI' => 'Marie-Hélène Bersani',
        'BIDEAU' => 'Iabelle Bideau',
        'BOHL' => 'Thomas Bohl',
        'BROUILLET' => 'Stéphanie Brouillet',
        'CAVALIE' => 'Hélène Cavalié',
        'CINQPEYRES' => 'Muriel Cinqpeyres',
        'DELAMOTTE' => 'Céline Delamotte',
        'DENIS' => 'Arnaud Denis',
        'GAUTIER' => 'Jean-Jacques Gautier',
        'GLOMET' => 'Valérie Glomet',
        'ISAKOVITCH' => 'Sandra Isakovitch',
        'MANCEL' => 'Nicolas Mancel',
        'MONTAGNE' => 'Lucile Montagne',
        'SARASA' => 'Marina Sarasa',
        'THARAUD' => 'Marie-Amélie Tharaud',
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
            'photographer' => $this->photographer,
        ];
    }

    public function getPhotographerAttribute()
    {
        $re = '/(' . collect(self::IDENTIFIED_PHOTOGRAPHERS)->keys()->implode('|') . ')/';
        if (preg_match($re, $this->path, $matches) > 0) {
            return self::IDENTIFIED_PHOTOGRAPHERS[$matches[1]];
        }
        return null;
    }
}
