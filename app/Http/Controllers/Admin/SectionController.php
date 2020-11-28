<?php

namespace App\Http\Controllers\Admin;

use A17\Twill\Http\Controllers\Admin\ModuleController;

class SectionController extends ModuleController
{
    protected $moduleName = 'sections';

    protected $permalinkBase = 'encyclopedie/rubriques';

    /*
     * Options of the index view
     */
    protected $indexOptions = [
        'create' => true,
        'edit' => true,
        'publish' => true,
        'bulkPublish' => false,
        'feature' => false,
        'bulkFeature' => false,
        'restore' => false,
        'bulkRestore' => false,
        'delete' => true,
        'bulkDelete' => false,
        'reorder' => true,
        'permalink' => true,
        'bulkEdit' => true,
        'editInModal' => true,
        'forceDelete' => false,
        'bulkForceDelete' => false,
    ];
}
