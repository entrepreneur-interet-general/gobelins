<?php

namespace App\Models\Presenters;

use App\Models\Article;
use App\Models\Presenters\Presenter;

class ArticlePresenter extends Presenter
{
    public function tagsAsString()
    {
        return $this->tags->map(function ($tag) {
            return $tag->name;
        })->implode(', ');
    }

    public function relatedArticles($qty = 3)
    {
        if ($this->section) {
            return Article::where('section_id', '=', $this->section->id)->limit($qty)->get();
        } else {
            return Article::orderBy('updated_at', 'DESC')->limit($qty)->get();
        }
    }

    public function featuredArticles()
    {
        $related = $this->related;
        if ($related->count() < 3) {
            $related = $this->relatedArticles(3);
            return $related;
        } else {
            return $related;
        }
    }
}
