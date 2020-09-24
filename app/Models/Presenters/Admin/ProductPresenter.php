<?php

namespace App\Models\Presenters\Admin;

use App\Models\Presenters\Presenter;

class ProductPresenter extends Presenter
{
    public function tagsAsString()
    {
        return $this->tags->map(function ($tag) {
            return $tag->name;
        })->implode(', ');
    }
}
