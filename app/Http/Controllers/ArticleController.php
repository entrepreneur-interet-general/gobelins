<?php

namespace App\Http\Controllers;

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
}
