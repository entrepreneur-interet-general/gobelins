<?php

namespace App\Http\Controllers;

use A17\Twill\Models\Feature;
use App\Models\Section;
use App\Repositories\ArticleRepository;

class ArticleController extends Controller
{

    public function __construct(ArticleRepository $repository)
    {
        $this->repository = $repository;
    }

    public function show($slug)
    {
        $article = $this->repository->forSlug($slug);
        abort_unless($article, 404, 'Article ');
        return view('site.article', ['item' => $article]);
    }

    public function home()
    {
        $featured_primary = Feature::forBucket('home_primary_features');
        $featured_secondary = Feature::forBucket('home_secondary_features');
        $sections = Section::published()->get();
        $section_articles = [];
        $sections->each(function ($s) use (&$section_articles) {
            $section_articles[$s->slug] = $this->repository->inSection($s);
        });

        return view('site.article_home', [
            'featured_primary' => $featured_primary,
            'featured_secondary' => $featured_secondary,
            'sections' => $sections,
            'section_articles' => $section_articles,
        ]);
    }
}
