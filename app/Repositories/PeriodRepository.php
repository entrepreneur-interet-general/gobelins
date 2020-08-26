<?php

namespace App\Repositories;

use A17\Twill\Repositories\ModuleRepository;
use App\Models\Period;

class PeriodRepository extends ModuleRepository
{

    public function __construct(Period $model)
    {
        $this->model = $model;
    }
}
