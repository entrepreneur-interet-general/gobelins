<?php

namespace App\Models\Presenters\Admin;

use App\Models\Presenters\Presenter;
use Illuminate\Support\Str;

class ArticlePresenter extends Presenter
{
    public function tagsAsString()
    {
        return $this->tags->map(function ($tag) {
            return $tag->name;
        })->implode(', ');
    }

    public function truncatedLead($truncate = 100)
    {
        $stripped = strip_tags($this->lead);
        $ellipsis = Str::length($stripped) > $truncate ? '…' : '';
        return Str::substr($stripped, 0, $truncate) . $ellipsis;
    }
}
