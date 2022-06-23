<?php

namespace App\Models;

use A17\Twill\Models\Behaviors\HasBlocks;
use A17\Twill\Models\Behaviors\HasMedias;
use A17\Twill\Models\Behaviors\HasPosition;
use A17\Twill\Models\Behaviors\HasRelated;
use A17\Twill\Models\Behaviors\HasRevisions;
use A17\Twill\Models\Behaviors\HasSlug;
use A17\Twill\Models\Behaviors\Sortable;
use A17\Twill\Models\Model;
use App\Models\Presenters\Admin\ArticlePresenter as AdminArticlePresenter;
use App\Models\Presenters\ArticlePresenter as ArticlePresenter;

class Article extends Model implements Sortable
{
    use HasBlocks, HasSlug, HasMedias, HasRevisions, HasPosition, HasRelated;

    public $presenterAdmin = AdminArticlePresenter::class;
    public $presenter = ArticlePresenter::class;

    protected $fillable = [
        'published',
        'title',
        'subtitle',
        'byline',
        'lead',
        'reading_time',
        'footnotes',
        'bibliography',
        'section_id',
        'position',
        'publish_start_date',
        'publish_end_date',
    ];

    protected $dates = [
        'publish_start_date',
        'publish_end_date',
    ];

    public $slugAttributes = [
        'title',
    ];

    public $mediasParams = [
        'cover' => [
            'vertical' => [
                [
                    'name' => 'Portrait',
                    'ratio' => 3 / 5,
                ],
            ],
            'horizontal' => [
                [
                    'name' => 'Paysage',
                    'ratio' => 16 / 9,
                ],
            ],
            'recirculation' => [
                [
                    'name' => 'Recirculation',
                    'ratio' => 3 / 4,
                ],
            ],
        ],
    ];

    /* Relations */

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function related()
    {
        return $this->belongsToMany(__CLASS__, 'article_related_article', 'article_id', 'related_article_id')->published()->orderBy('position');
    }

    public function blocksOfType($type)
    {
        return $this->blocks()->where('type', $type)->get();
    }
}
