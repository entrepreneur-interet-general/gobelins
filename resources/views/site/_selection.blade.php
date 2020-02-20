{{-- @dd($selection) --}}

<div class="SelectionDetail is-ssr">
    <div class="SelectionDetail__cross-nav-bar"><a class="Selections__close SelectionDetail__close"
            href="/recherche"><svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path stroke="currentColor" stroke-linecap="round" vector-effect="non-scaling-stroke"
                    d="M1 1l14 14M15 1L1 15"></path>
            </svg></a><a class="SelectionDetail__back-to-selections" href="/selections/"><svg width="19" height="19"
                viewBox="0 0 19 19" fill="none">
                <path d="M9 18L1 9.522M9 1L1 9.478" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round"
                    stroke-linejoin="round"></path>
                <path stroke="currentColor" stroke-linecap="round" d="M18.5 9.5h-17"></path>
            </svg></a></div>
    <div class="SelectionDetail__header">
        <div class="SelectionDetail__header-left">
            <hgroup class="SelectionDetail__header-line">
                <h1>{{ $selection['name'] }}</h1><span
                    class="SelectionsListItem__count">@choice('selection.product_count',
                    sizeof($selection['products']))</span><span> par {{ collect($selection['users'])->map(function($u) {
                    return $u->name;
                })->join(', ', ', et ') }}</span>
            </hgroup>
        </div>
        <div class="SelectionDetail__header-right">
            {{ $selection->description }}
        </div>
    </div>
    <div class="SelectionDetail__grid">
        <div class="SelectionDetail__masonry-container">
            @foreach ($selection['products'] as $p)
            <a href="{{ route('product', $p->inventory_id) }}" class="Collection__cell SelectionDetail__grid-item">
                @if($p->posterImage)
                <figure class="Collection__image-container">
                    <img src="{{ image_url('/media/xl/' . $p->posterImage->path, 600) }}"
                        alt="{{ $p->title_or_designation }}">
                </figure>
                @endif
                <div class="Collection__cell-label">
                    <h2 class="Collection__cell-title">{{ $p->title_or_designation }}</h2>
                    <small class="Collection__cell-authors">{{ $p->authors->map(function ($a) {
                            return $a->last_name . ' ' .$a->first_name;
                        })->join(', ', ', et ') }}</small>
                </div>
            </a>
            @endforeach
        </div>
    </div>
</div>