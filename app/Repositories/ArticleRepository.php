<?php

namespace App\Repositories;

use A17\Twill\Repositories\Behaviors\HandleBlocks;
use A17\Twill\Repositories\Behaviors\HandleMedias;
use A17\Twill\Repositories\Behaviors\HandleRevisions;
use A17\Twill\Repositories\Behaviors\HandleSlugs;
use A17\Twill\Repositories\Behaviors\HandleTags;
use A17\Twill\Repositories\ModuleRepository;
use App\Models\Article;

class ArticleRepository extends ModuleRepository
{
    use HandleBlocks, HandleSlugs, HandleMedias, HandleRevisions, HandleTags;

    public function __construct(Article $model)
    {
        $this->model = $model;
    }

    public function filter($query, array $scopes = [])
    {
        $this->addRelationFilterScope($query, $scopes, 'section_id', 'section');

        $this->searchIn($query, $scopes, 'search', [
            'title',
            'subtitle',
            'byline',
            'lead',
        ]);

        return parent::filter($query, $scopes);
    }

    public function afterSave($object, $fields)
    {
        $this->updateBrowser($object, $fields, 'related');
        parent::afterSave($object, $fields);
    }

    public function getFormFields($object)
    {
        $fields = parent::getFormFields($object);
        $fields['browsers']['related'] = $this->getFormFieldsForBrowser($object, 'related', 'savoir-faire', 'title', 'articles');
        return $fields;
    }
}
