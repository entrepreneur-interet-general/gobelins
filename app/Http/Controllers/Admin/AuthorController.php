<?php

namespace App\Http\Controllers\Admin;

use A17\Twill\Http\Controllers\Admin\ModuleController;

class AuthorController extends ModuleController
{
    protected $moduleName = 'authors';

    /*
     * Options of the index view
     */
    protected $indexOptions = [
        'create' => true,
        'edit' => true,
        'publish' => false,
        'bulkPublish' => false,
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
    protected $titleColumnKey = 'last_name';

    /*
     * Available columns of the index view
     */
    protected $indexColumns = [
        'last_name' => [
            'title' => 'Nom',
            'field' => 'last_name',
            'sort' => true,
        ],
        'first_name' => [
            'title' => 'Prénom',
            'field' => 'first_name',
            'sort' => true,
        ],
        'date_of_birth' => [
            'title' => 'Date de naissance',
            'field' => 'date_of_birth',
            'sort' => true,
            'visible' => false,
        ],
        'year_of_birth' => [
            'title' => 'Année de naissance',
            'field' => 'year_of_birth',
            'sort' => true,
            'visible' => true,
        ],
        'date_of_death' => [
            'title' => 'Date de mort',
            'field' => 'date_of_death',
            'sort' => true,
            'visible' => false,
        ],
        'year_of_death' => [
            'title' => 'Année de mort',
            'field' => 'year_of_death',
            'sort' => true,
            'visible' => true,
        ],
        'occupation' => [
            'title' => 'Profession',
            'field' => 'occupation',
            'sort' => true,
            'visible' => false,
        ],
        'birth_place' => [
            'title' => 'Lieu de naissance',
            'field' => 'birth_place',
            'sort' => true,
            'visible' => false,
        ],
        'death_place' => [
            'title' => 'Lieu de mort',
            'field' => 'death_place',
            'sort' => true,
            'visible' => false,
        ],
        'isni_uri' => [
            'title' => 'ISNI',
            'field' => 'isni_uri',
            'sort' => true,
            'visible' => false,
        ],

        // 'presenterMethodField' => [ // presenter column
        //     'title' => 'Field title',
        //     'field' => 'presenterMethod',
        //     'present' => true,
        // ]
    ];

    protected $filters = [
        // 'fIsni' => 'isni_uri',
    ];

    /*
     * Add anything you would like to have available in your module's index view
     */
    protected function indexData($request)
    {
        return [
            // 'fIsniList' => [null => 'Sans ISNI', 'http' => 'Avec ISNI'],
        ];
    }
}
