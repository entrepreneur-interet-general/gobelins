<?php

namespace App\Models;

use A17\Twill\Models\Behaviors\HasBlocks;
use A17\Twill\Models\Behaviors\HasMedias;
use A17\Twill\Models\Behaviors\HasPosition;
use A17\Twill\Models\Behaviors\HasRevisions;
use A17\Twill\Models\Behaviors\HasSlug;
use A17\Twill\Models\Behaviors\Sortable;
use A17\Twill\Models\Model;
use App\Models\Presenters\Admin\ArticlePresenter as AdminArticlePresenter;

class Article extends Model implements Sortable
{
    use HasBlocks, HasSlug, HasMedias, HasRevisions, HasPosition;

    public $presenterAdmin = AdminArticlePresenter::class;

    protected $fillable = [
        'published',
        'title',
        'subtitle',
        'byline',
        'lead',
        'footnotes',
        'bibliography',
        'section_id',
        'position',
        'publish_start_date',
        'publish_end_date',
    ];

    public $slugAttributes = [
        'title',
    ];

    public $mediasParams = [
        'cover' => [
            'desktop' => [
                [
                    'name' => 'desktop',
                    'ratio' => 16 / 9,
                ],
            ],
            'mobile' => [
                [
                    'name' => 'mobile',
                    'ratio' => 1,
                ],
            ],
            'flexible' => [
                [
                    'name' => 'free',
                    'ratio' => 0,
                ],
                [
                    'name' => 'landscape',
                    'ratio' => 16 / 9,
                ],
                [
                    'name' => 'portrait',
                    'ratio' => 3 / 5,
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
        return $this->belongsToMany(__CLASS__, 'article_related_article', 'article_id', 'related_article_id')->orderBy('position');
    }
}
