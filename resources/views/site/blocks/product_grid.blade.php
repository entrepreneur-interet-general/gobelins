@php
    
    $selected_items_ids = $block->browserIds('products');
    $products = \App\Models\Product::find($selected_items_ids)->sortBy(function($p) use ($selected_items_ids) {
        return array_search($p->getKey(), $selected_items_ids);
    });

@endphp


<div class="ArticleCollectionGrid @if($block->input('dark_bg')) on-dark-bg @endif" data-colcade="columns: .ArticleCollectionGrid__column, items: .ArticleCollectionGrid__item">

    <div class="ArticleCollectionGrid__column"></div>
    <div class="ArticleCollectionGrid__column"></div>
    <div class="ArticleCollectionGrid__column"></div>

    @foreach($products as $prod)

        <a href="{{ route('product', ['inventory_id' => $prod->inventory_id]) }}" target="_blank" class="ArticleCollectionGrid__item">

            @if ($prod->posterImage)
                <img src="{{  image_url('/media/xl/' . $prod->posterImage->path, 600) }}" alt="" class="ArticleCollectionGrid__thumbnail">
            @else
                <div class="ArticleCollectionGrid__no-image"><span>Objet sans image</span></div>
            @endif

            <div class="ArticleCollectionGrid__label">

                <strong class="ArticleCollectionGrid__name">{{ $prod->present()->nameInListing }}</strong><em class="ArticleCollectionGrid__authors">{{ $prod->present()->authorsInListing }}</em>

            </div>

        </a>
    @endforeach


</div>
