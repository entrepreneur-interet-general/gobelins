<?php

namespace App\Repositories;

use A17\Twill\Repositories\ModuleRepository;
use App\Models\ProductionOrigin;

class ProductionOriginRepository extends ModuleRepository
{

    public function __construct(ProductionOrigin $model)
    {
        $this->model = $model;
    }
}
