@extends('site.layouts.article')

@section('content')

    <div class="ArticleList">
        <h1 class="ArticleList__page-title">
            Encyclopédie des savoir-faire
        </h1>
        <div class="ArticleList__result-head">

            @if($articles->isEmpty())

               @switch($request_type)
                    @case('tag')
                        Aucun article trouvé pour le tag « {{ $slug }} »
                        @break
                
                    @case('section')
                        Aucun article trouvé dans la rubrique « {{ $slug }} »
                        @break

                    @case('recent')
                        Aucun article publié récemment
                        @break
                
                    @default
                        Aucun article trouvé pour la recherche « {{ $slug }} »
                @endswitch

            @else

                {{ $articles->total() }} 
                {{ Str::plural('article', $articles->total()) }}

               @switch($request_type)
                    @case('tag')
                        {{ Str::plural('trouvé', $articles->total()) }}
                        pour le tag « {{ $slug }} » :
                        @break
                
                    @case('section')
                        {{ Str::plural('trouvé', $articles->total()) }}
                        dans la rubrique « {{ $slug }} » :
                        @break
                
                    @case('recent')
                        {{ Str::plural('publié', $articles->total()) }}
                        récemment :
                        @break
                
                    @default
                        {{ Str::plural('trouvé', $articles->total()) }}
                        pour la recherche « {{ $slug }} »
                @endswitch

            @endif

        </div>
        <ul class="StepStack ArticleList__cardstack">
            @each('site._card', $articles, 'article')
        </ul>
    </div>

    <div>
        {{ $articles->links() }}
    </div>

    @include('site._site_footer')

@stop