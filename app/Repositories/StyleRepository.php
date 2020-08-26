<?php

namespace App\Repositories;

use A17\Twill\Repositories\ModuleRepository;
use App\Models\Style;

class StyleRepository extends ModuleRepository
{

    public function __construct(Style $model)
    {
        $this->model = $model;
    }
}
