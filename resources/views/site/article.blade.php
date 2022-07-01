@extends('site.layouts.article')

@section('content')

    @include('site._nav')
    @include('site._search')
    
    <article class="Article">

        <header class="Article__header" id="page-top">

            <div class="Article__cover-text">

                <div class="Article__cover-primary">

                    <div class="Article__logo-container">
                        <a href="{{ route('articles.home') }}" class="Article__logo-encyclo">
                            Encyclopédie des savoir-faire
                        </a>
                        <div class="Article__logo-mobnat">
                            Mobilier National
                        </div>
                    </div>

                    <h1 class="Article__h1">
                        <span class="Article__h1-inner">
                            <span class="Article__title" data-js-jumpnav-article-title>
                                {{ $item->title }}
                            </span>
                            @if($item->subtitle)
                                <span class="Article__subtitle">
                                    {{ $item->subtitle }}
                                </span>
                            @endif
                            <div class="Article__reading-time">
                                <svg width="22" height="9" class="Article__reading-time-icon" alt="Temps de lecture">
                                    <title>Temps de lecture</title>
                                    <circle cx="16.0009" cy="4.55556" r="3.55556" stroke="white"/>
                                    <circle cx="6.22157" cy="4.55556" r="3.55556" stroke="white"/>
                                    <path d="M12.4435 4.5561C12.4435 3.57426 11.8466 2.77832 11.1102 2.77832C10.3738 2.77832 9.77686 3.57426 9.77686 4.5561" stroke="white"/>
                                    <path d="M1 3.55566H2.4" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M19.8906 3.55566H21.0017" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span class="Article__reading-time-label">{{ $item->reading_time}} min</span>
                            </div>
                            <svg width="20" height="27" viewBox="0 0 20 27" class="Article__arrow-down">
                                <path d="M18.7441 18.1543L9.97363 26.5" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M0.999268 18L9.97388 26.5" stroke="white" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9.97365 26.5L9.97363 1" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                    </h1>



                    <div class="Article__meta-wrap">
                        <strong class="Article__byline">
                            {{ $item->byline }}
                        </strong>

                        <div class="Article__cover-dates">
                            <div class="Article__published-on">
                                Publié le {{ $item->publish_start_date->isoFormat('D MMMM Y') }}
                            </div>
                            <div class="Article__updated-on">
                                Mis à jour le {{ $item->updated_at->isoFormat('D MMMM Y') }}
                            </div>
                        </div>
                    </div>

                </div>

                <figure class="Article__cover-image-container">
                    <img src="{{ $item->image('cover', 'vertical') }}" alt="{{ $item->imageAltText('cover') }}" class="Article__cover-image">
                </figure>

                <div class="Article__lead">
                    {!! $item->lead !!}
                </div>

                @if($item->tags)
                    <nav class="Article__tags">
                        @foreach($item->tags as $tag)
                            <a href="{{ route('articles.by_tag', ['tag' => $tag->slug]) }}" class="Article__tag">{{ $tag->name }}</a>
                        @endforeach
                    </nav>
                @endif

                {{-- <svg width="19" height="10" viewBox="0 0 19 10" fill="none" class="Article__header-down-arrow">
                    <path d="M18 1L9.52234 9.02728" stroke="#A6A6A6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M1 1L9.47766 9.02728" stroke="#A6A6A6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg> --}}

            </div><!-- /.Article__cover-text -->

        </header>

        <nav class="Article__toc">
            @foreach($item->blocksOfType('heading2') as $heading2)
                <a class="Article__toc-item" href="#section-{{ $loop->index + 1 }}">{{ $heading2->input('heading2') }}</a>
            @endforeach
        </nav>

        <main class="Article__main">

            {!! $item->renderBlocks(false) !!}

            <div class="Article__bottom-spacer"></div>

            @if($item->footnotes)
                <div class="Article__footnotes">
                    <div class="Article__footnotes-decoration"></div>
                    <div class="Article__vertical-label">
                        <span>Notes</span>
                    </div>
                    <div class="Article__double-col-container">
                        {!! $item->footnotes !!}
                    </div>
                </div>
            @endif

            @if($item->bibliography)
                <div class="Article__bibliography">
                    <div class="Article__vertical-label">
                        <span>Bibliographie</span>
                    </div>
                    <div class="Article__double-col-container">
                        {!! $item->bibliography !!}
                    </div>
                </div>
            @endif


            @if($item->present()->photoCredits->isNotEmpty())
                <div class="Article__credits">
                    <div class="Article__vertical-label">
                        <span>Crédits photo</span>
                    </div>
                    <div class="Article__double-col-container">
                        <p>{{ $item->present()->photoCredits->join(', ') }}.</p>
                    </div>
                </div>
            @endif

        </main>

        <footer class="Article__footer">

            <div class="Article__footer-label">
                <span>À lire aussi</span>
            </div>

            <ul class="Article__footer-featured-stack" data-carousel>
                @each('site._card', $item->present()->featuredArticles, 'article')
            </ul>
        </footer>

    </article>

    @include('site._site_footer')

@stop