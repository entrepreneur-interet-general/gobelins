<li class="Card is-new">
    <div class="Card__text">
        <h3 class="Card__title">
            <a href="{{ route('article.show', ['slug' => $article->slug]) }}" class="Card__link">
                {{ $article->title }}
                @isset($article->subtitle)
                    <span class="Card__subtitle">{{ $article->subtitle }}</span>
                @endisset
            </a>
        </h3>
        <p class="Card__meta">
            <span class="Card__reading-time">
                <img src="{{ asset('images/encyclo/reading_time.svg') }}" class="Card__reading-time-icon" alt="Temps de lecture">
                <span class="Card__reading-time-label">{{ $article->reading_time}} min</span>
            </span>
            @foreach($article->present()->tags as $tag)
                <a href="{{ route('articles.by_tag', ['tag' => $tag->slug]) }}" class="Card__tag">{{ $tag->name }}</a>
            @endforeach
        </p>

    </div>
    <figure class="Card__fig">
        <img src="{{ $article->image('cover', ($orientation ?? 'vertical')) }}" alt="{{ $article->imageAltText('cover') }}" class="Card__img">
    </figure>
</li>
