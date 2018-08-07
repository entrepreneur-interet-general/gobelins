<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Authorship extends Pivot
{
    public const AUTHOR_NATURE = [
        0 => '',
        1 => 'auteur_du_modele',
        2 => 'auteur_de_l_oeuvre',
        3 => 'auteur_presume_de_l_oeuvre',
        4 => 'concepteur',
    ];

    protected $table = 'authorships';

    protected $touches = ['product'];

    // Fillables

    protected $fillable = [
        'nature_code',
        'relevant_detail',
    ];

    public static function authorNatureCode($author_nature)
    {
        return array_search($author_nature, self::AUTHOR_NATURE);
    }

    public function getAuthorNatureAttribute()
    {
        return self::NATURE[$this->nature_code ?: 0];
    }

    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
