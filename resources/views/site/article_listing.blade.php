@extends('site.layouts.article')

@section('content')

    @include('site._nav')
    @include('site._search')

    <div class="ArticleList">
        <div class="ArticleList__halos">
            <div class="ArticleList__halo1"></div>
            <div class="ArticleList__halo2"></div>
            <div class="ArticleList__halo3"></div>
            <div class="ArticleList__halo4"></div>
        </div>
        <header class="ArticleList__header">
            <h1 class="ArticleList__page-title">
                <a href="{{ route('articles.home') }}">Encyclopédie des savoir-faire</a>
            </h1>
            <div class="ArticleList__result-head">

                @if($articles->isEmpty())

                    <p class="ArticleList__no-result-title">
                        @switch($request_type)
                            @case('tag')
                                Aucun article trouvé pour le tag<br class="ArticleList__br-large"> «&nbsp;{{ $slug }}&nbsp;»
                                @break
                        
                            @case('section')
                                Aucun article trouvé dans la rubrique<br class="ArticleList__br-large"> «&nbsp;{{ $slug }}&nbsp;»
                                @break

                            @case('recent')
                                Aucun article publié récemment
                                @break
                        
                            @default
                                Aucun article trouvé pour la recherche<br class="ArticleList__br-large"> «&nbsp;{{ $slug }}&nbsp;»
                        @endswitch
                    </p>

                    <p class="ArticleList__no-result-layus">
                        Vous ne trouvez pas le sujet qui vous intéresse ?<br>
                        <a href="mailto:documentation.mobilier@culture.gouv.fr">Contactez-nous</a> pour le soumettre. En attendant nous vous invitons à explorer la <a href="{{ route('articles.home') }}">page d’accueil</a>.
                    </p>

                @else

                    {{ $articles->total() }} 
                    {{ Str::plural('article', $articles->total()) }}

                @switch($request_type)
                        @case('tag')
                            {{ Str::plural('trouvé', $articles->total()) }}
                            pour le tag<br class="ArticleList__br-large"> «&nbsp;{{ $slug }}&nbsp;» :
                            @break
                    
                        @case('section')
                            {{ Str::plural('trouvé', $articles->total()) }}
                            dans la rubrique<br class="ArticleList__br-large"> «&nbsp;{{ $slug }}&nbsp;» :
                            @break
                    
                        @case('recent')
                            {{ Str::plural('publié', $articles->total()) }}
                            récemment :
                            @break
                    
                        @default
                            {{ Str::plural('trouvé', $articles->total()) }}
                            pour la recherche<br class="ArticleList__br-large"> «&nbsp;{{ $slug }}&nbsp;»
                    @endswitch

                @endif

            </div>
        </header>
        <ul class="StepStack ArticleList__cardstack">
            @each('site._card', $articles, 'article')
        </ul>
        <div class="ArticleList__pagination">
            {{ $articles->links('vendor.pagination.default') }}
        </div>
    </div>


    @include('site._site_footer')

@stop