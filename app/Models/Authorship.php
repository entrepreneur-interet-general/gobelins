<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Authorship extends Pivot
{
    protected $nature_mapping = [
        0 => '',
        1 => 'auteur_du_modele',
        2 => 'auteur_de_l_oeuvre',
        3 => 'auteur_presume_de_l_oeuvre',
        4 => 'concepteur',
    ];

    public function nature()
    {
        return $this->nature_mapping[$this->nature_code ?: 0];
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
