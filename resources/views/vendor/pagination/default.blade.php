@if ($paginator->hasPages())
    <nav class="Pagination">
        <ul class="Pagination__list">
            {{-- Previous Page Link --}}
            @if ($paginator->onFirstPage())
                <li class="disabled Pagination__prev" aria-disabled="true" aria-label="@lang('pagination.previous')">
                    <span aria-hidden="true"><svg width="10" height="20" viewBox="0 0 10 20" fill="none"><path d="M9.00049 19.4453L1 10.5039L9.09863 1" stroke="#3338BA" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg></span>
                </li>
            @else
                <li class="Pagination__prev">
                    <a href="{{ $paginator->previousPageUrl() }}" rel="prev" aria-label="@lang('pagination.previous')"><svg width="10" height="20" viewBox="0 0 10 20" fill="none"><path d="M9.00049 19.4453L1 10.5039L9.09863 1" stroke="#3338BA" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg></a>
                </li>
            @endif

            {{-- Pagination Elements --}}
            @foreach ($elements as $element)
                {{-- "Three Dots" Separator --}}
                @if (is_string($element))
                    <li class="disabled" aria-disabled="true"><span>{{ $element }}</span></li>
                @endif

                {{-- Array Of Links --}}
                @if (is_array($element))
                    @foreach ($element as $page => $url)
                        @if ($page == $paginator->currentPage())
                            <li class="active" aria-current="page"><span>{{ $page }}</span></li>
                        @else
                            <li><a href="{{ $url }}">{{ $page }}</a></li>
                        @endif
                    @endforeach
                @endif
            @endforeach

            {{-- Next Page Link --}}
            @if ($paginator->hasMorePages())
                <li class="Pagination__next">
                    <a href="{{ $paginator->nextPageUrl() }}" rel="next" aria-label="@lang('pagination.next')"><svg width="10" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.09717 1L9.09766 9.94141L0.999023 19.4453" stroke="#3338BA" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    </a>
                </li>
            @else
                <li class="disabled Pagination__next" aria-disabled="true" aria-label="@lang('pagination.next')">
                    <span aria-hidden="true"><svg width="10" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.09717 1L9.09766 9.94141L0.999023 19.4453" stroke="#3338BA" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
                </li>
            @endif
        </ul>
    </nav>
@endif
