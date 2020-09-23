<?php

namespace App\Repositories;

use A17\Twill\Repositories\Behaviors\HandleSlugs;
use A17\Twill\Repositories\ModuleRepository;
use App\Models\Section;

class SectionRepository extends ModuleRepository
{
    use HandleSlugs;

    public function __construct(Section $model)
    {
        $this->model = $model;
    }
}
