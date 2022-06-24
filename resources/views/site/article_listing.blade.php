@extends('site.layouts.article')

@section('content')

    <div class="ArticleList">
        <ul class="StepStack ArticleList__cardstack">
            @each('site._card', $articles, 'article')
        </ul>
    </div>

    <div>
        {{ $articles->links() }}
    </div>

    @include('site._site_footer')

@stop