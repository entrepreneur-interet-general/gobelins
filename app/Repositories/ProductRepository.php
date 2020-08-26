<?php

namespace App\Repositories;

use A17\Twill\Repositories\ModuleRepository;
use App\Models\Product;

class ProductRepository extends ModuleRepository
{

    public function __construct(Product $model)
    {
        $this->model = $model;
    }

    public function filter($query, array $scopes = [])
    {
        $this->addRelationFilterScope($query, $scopes, 'period_id', 'period');

        $this->searchIn($query, $scopes, 'search', [
            'inventory_id',
            'denomination',
            'title_or_designation',
        ]);

        return parent::filter($query, $scopes);
    }
}
