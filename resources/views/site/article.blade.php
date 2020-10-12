<article class="Article">

    <header>

        <div class="Article__cover-text">

            <h1>
                <span class="Article__title">
                    {{ $item->title }}
                </span>
                <span class="Article__subtitle">
                    {{ $item->subtitle }}
                </span>
            </h1>

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

            <div class="Article__lead">
                {!! $item->lead !!}
            </div>

            @if($item->tags)
                <nav class="Article__tags">
                    @foreach($item->tags as $tag)
                        <a href="#TODO" class="Article__tag">{{ $tag->name }}</a>
                    @endforeach
                </nav>
            @endif

            <svg width="19" height="10" viewBox="0 0 19 10" fill="none" class="Article__header-down-arrow">
                <path d="M18 1L9.52234 9.02728" stroke="#A6A6A6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 1L9.47766 9.02728" stroke="#A6A6A6" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

        </div><!-- /.Article__cover-text -->

        <figure class="Article__cover-image-container">
            <img src="{{ $item->image('cover', 'vertical') }}" alt="{{ $item->imageAltText('cover') }}" class="Article__cover-image">
        </figure>

    </header>

    <main class="Article__main">

        {!! $item->renderBlocks() !!}

        @if($item->footnotes)
            <div class="Article__footnotes">
                {!! $item->footnotes !!}
            </div>
        @endif

        @if($item->bibliography)
            <div class="Article__bibliography">
                {!! $item->bibliography !!}
            </div>
        @endif

    </main>

    <footer class="Article__footer">

        @foreach($item->present()->featuredArticles as $article)
            <div class="RelatedArticle">
                {{ $article->title }}
                <img src="{{ $article->image('cover', 'vertical') }}" alt="" width="100" class="RelatedArticle__thumb">
            </div>
        @endforeach
    </footer>

</article>