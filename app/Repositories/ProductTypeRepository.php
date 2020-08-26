<?php

namespace App\Repositories;

use A17\Twill\Repositories\ModuleRepository;
use App\Models\ProductType;

class ProductTypeRepository extends ModuleRepository
{

    public function __construct(ProductType $model)
    {
        $this->model = $model;
    }
}
