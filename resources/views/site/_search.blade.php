<div class="Search">
    <button class="Search__button" aria-label="Rechercher" type="button" id="open-search-panel" data-a11y-dialog-show="search_dialog">
        <svg width="19" height="17" viewBox="0 0 19 17" fill="none">
            <path d="M6.81569 10.9084L1 16.4423M11.7664 13.0365C8.32401 13.0365 5.53343 10.3421 5.53343 7.01827C5.53343 3.69447 8.32401 1 11.7664 1C15.2087 1 17.9993 3.69447 17.9993 7.01827C17.9993 10.3421 15.2087 13.0365 11.7664 13.0365Z" stroke="#3338BA" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </button>
</div>

<div id="search_dialog" aria-labelledby="search-dialog-id" aria-hidden="true" class="Search__container">
    <div data-a11y-dialog-hide class="Search__backdrop">
        <div class="Search__halos">
            <div class="Search__halo1"></div>
            <div class="Search__halo2"></div>
            <div class="Search__halo3"></div>
        </div>
    </div>
    <div role="document" class="Search__content">
        <button type="button" data-a11y-dialog-hide aria-label="Fermer"  class="Search__close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 1.2783L7.97158 7.89748M1.12398 14.9644L7.8928 8.07899M15.0019 14.7213L8.03036 8.1021M14.878 1.03516L8.10914 7.92059" stroke="#3338BA" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        {{-- <h1 id="your-dialog-title-id">Rechercher</h1> --}}
        <form method="get" action="{{ route('articles.search') }}" class="Search__form">
            <div class="Search__input-row">
                <div class="Search__input-holder">
                    <input type="search" class="Search__input" placeholder="Rechercher un mot-clé, matière, outil…" autofocus name="q">
                </div>

                <div class="Search__submit-holder">
                    <button class="Search__submit" type="submit">
                    <svg width="19" height="17" viewBox="0 0 19 17" fill="none">
                        <path d="M6.81569 10.9084L1 16.4423M11.7664 13.0365C8.32401 13.0365 5.53343 10.3421 5.53343 7.01827C5.53343 3.69447 8.32401 1 11.7664 1C15.2087 1 17.9993 3.69447 17.9993 7.01827C17.9993 10.3421 15.2087 13.0365 11.7664 13.0365Z" stroke="#3338BA" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                </div>
            </div>

            <div class="Search__suggestions">
                <div class="Search__suggest-themes">
                    <span class="Search__suggest-themes-label">thèmes : </span>
                    <a href="{{ route('articles.search', ['q' => 'textile']) }}"><img src="/images/search/textile.png" alt="">textile</a>
                    <a href="{{ route('articles.search', ['q' => 'bois']) }}" ><img src="/images/search/bois.png" alt="">bois</a>
                    <a href="{{ route('articles.search', ['q' => 'métal']) }}"><img src="/images/search/metal.png" alt="">métal</a>
                </div>
                <div class="Search__suggest-tags">
                    <a href="{{ route('articles.search', ['q' => 'contemporain']) }}">contemporain</a>
                    <a href="{{ route('articles.search', ['q' => 'historique']) }}">historique</a>
                    <a href="{{ route('articles.search', ['q' => 'création']) }}">création</a>
                    <a href="{{ route('articles.search', ['q' => 'restauration']) }}">restauration</a>
                </div>
            </div>
        </form>
    </div>
</div>