<?php

namespace App\Http\Controllers\Admin;

use A17\Twill\Http\Controllers\Admin\ModuleController;
use App\Repositories\EntryModeRepository;
use App\Repositories\PeriodRepository;
use App\Repositories\ProductionOriginRepository;
use App\Repositories\ProductTypeRepository;
use App\Repositories\StyleRepository;

class ProductController extends ModuleController
{
    protected $moduleName = 'products';

    /*
     * Options of the index view
     */
    protected $indexOptions = [
        'create' => true,
        'edit' => true,
        'publish' => true,
        'bulkPublish' => true,
        'feature' => false,
        'bulkFeature' => false,
        'restore' => false,
        'bulkRestore' => false,
        'delete' => false,
        'bulkDelete' => false,
        'reorder' => false,
        'permalink' => false,
        'bulkEdit' => true,
        'editInModal' => false,
        'forceDelete' => false,
        'bulkForceDelete' => false,
    ];

    /*
     * Key of the index column to use as title/name/anythingelse column
     * This will be the first column in the listing and will have a link to the form
     */
    protected $titleColumnKey = 'inventory_id';

    /*
     * Available columns of the index view
     */
    protected $indexColumns = [
        'listing_thumbnail' => [
            'thumb' => true,
            'present' => true,
            'presenter' => 'listing_thumbnail',
        ],
        'inventory_id' => [
            'title' => 'Numéro d’inventaire',
            'field' => 'inventory_id',
        ],
        'title_or_designation' => [
            'title' => 'Titre/Appellation',
            'field' => 'title_or_designation',
        ],
        'denomination' => [
            'title' => 'Dénomination',
            'field' => 'denomination',
        ],
    ];

    protected $browserColumns = [
        'listing_thumbnail' => [
            'thumb' => true,
            'present' => true,
            'presenter' => 'listing_thumbnail',
        ],
        'inventory_id' => [
            'title' => 'Numéro d’inventaire',
            'field' => 'inventory_id',
        ],
    ];

    protected $filters = [
        'époques' => 'period_id',
        'types' => 'product_type_id',
    ];

    public function getBrowserData($prependScope = [])
    {
        return parent::getBrowserData(['is_published' => true]);
    }

    /*
     * Add anything you would like to have available in your module's index view
     */
    protected function indexData($request)
    {
        return [
            'époquesList' => app(PeriodRepository::class)->listAll('name'), //->prepend('Toutes les époques', null)
            'typesList' => app(ProductTypeRepository::class)->listAll('mapping_key'),

            // Only used in the creation modal dialog.
            // Not sure out how to customize the index view ones.
            'customDraftLabel' => 'Visible',
            'customPublishedLabel' => 'Masqué',
        ];
    }

    protected function formData($request)
    {
        return [
            'periods' => app()->make(PeriodRepository::class)->listAll('name', ['start_year' => 'ASC']),
            'product_types' => app()->make(ProductTypeRepository::class)->listAll('mapping_key', ['id' => 'ASC']),
            'styles' => app()->make(StyleRepository::class)->listAll('name', ['start_year' => 'ASC']),
            'production_origins' => app()->make(ProductionOriginRepository::class)->listAll('name', ['id' => 'ASC']),
            'entry_modes' => app()->make(EntryModeRepository::class)->listAll('name', ['id' => 'ASC']),
        ];
    }

}
