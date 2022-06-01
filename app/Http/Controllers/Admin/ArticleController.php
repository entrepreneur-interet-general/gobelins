<?php

namespace App\Http\Controllers\Admin;

use A17\Twill\Http\Controllers\Admin\ModuleController;
use App\Repositories\ArticleRepository;
use App\Repositories\SectionRepository;

class ArticleController extends ModuleController
{
    protected $moduleName = 'articles';

    protected $permalinkBase = 'encyclopedie';

    /*
     * Options of the index view
     */
    protected $indexOptions = [
        'create' => true,
        'edit' => true,
        'publish' => true,
        'bulkPublish' => true,
        'feature' => false,
        'bulkFeature' => true,
        'restore' => true,
        'bulkRestore' => true,
        'delete' => true,
        'bulkDelete' => true,
        'reorder' => false,
        'permalink' => true,
        'bulkEdit' => true,
        'editInModal' => false,
        'forceDelete' => true,
        'bulkForceDelete' => true,
    ];

    /*
     * Key of the index column to use as title/name/anythingelse column
     * This will be the first column in the listing and will have a link to the form
     */
    protected $titleColumnKey = 'title';

    /*
     * Available columns of the index view
     */
    protected $indexColumns = [
        'title' => [
            'title' => 'Titre',
            'field' => 'title',
        ],
        'byline' => [
            'title' => 'Par',
            'field' => 'byline',
        ],
        'truncatedLead' => [
            'title' => 'Introduction',
            'field' => 'truncatedLead',
            'present' => true,
        ],
        'tagsAsString' => [
            'title' => 'Étiquettes',
            'field' => 'tagsAsString',
            'present' => true,
        ],
    ];

    protected $filters = [
        'sections' => 'section_id',
        'tags' => 'tag_id',
    ];

    /*
     * Add anything you would like to have available in your module's index view
     */
    protected function indexData($request)
    {
        return [
            'sectionsList' => app(SectionRepository::class)->listAll(),
            'tagsList' => app(ArticleRepository::class)->getTagsListForFilter(),
        ];
    }

    protected function formData($request)
    {
        return [
            'sections' => app(SectionRepository::class)->listAll(),
            'tags' => app(ArticleRepository::class)->getTagsListForFilter(),
        ];
    }
}
