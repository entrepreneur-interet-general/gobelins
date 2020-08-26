<?php

namespace App\Repositories;

use A17\Twill\Repositories\ModuleRepository;
use App\Models\EntryMode;

class EntryModeRepository extends ModuleRepository
{

    public function __construct(EntryMode $model)
    {
        $this->model = $model;
    }
}
