<?php

namespace App\Models;

use A17\Twill\Models\Behaviors\HasPosition;
use A17\Twill\Models\Behaviors\HasSlug;
use A17\Twill\Models\Behaviors\Sortable;
use A17\Twill\Models\Model;

class Section extends Model implements Sortable
{
    use HasSlug, HasPosition;

    protected $fillable = [
        'published',
        'title',
        'position',
    ];

    public $slugAttributes = [
        'title',
    ];

    /* Relations */

    public function articles()
    {
        return $this->hasMany(Article::class);
    }

}
