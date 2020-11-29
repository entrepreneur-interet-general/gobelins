@php
    
    $selected_items_ids = $block->browserIds('products');
    $products = \App\Models\Product::find($selected_items_ids);

@endphp


<div class="ArticleCollectionGrid @if($block->input('dark_bg')) on-dark-bg @endif">

    @foreach($products as $prod)

        <a href="{{ route('product', ['inventory_id' => $prod->inventory_id]) }}" class="ArticleCollectionGrid__item">

            @if ($prod->posterImage)
                <img src="{{  image_url('/media/xl/' . $prod->posterImage->path, 600) }}" alt="" class="ArticleCollectionGrid__thumbnail">
            @else
                <div className="ArticleCollectionGrid__no-image">Pas d'image</div>
            @endif

            <div className="ArticleCollectionGrid__label">

                <strong class="ArticleCollectionGrid__name">
                    {{ $prod->present()->nameInListing }}
                </strong>

                <em class="ArticleCollectionGrid__authors">
                    {{ $prod->present()->authorsInListing }}
                </em>

            </div>

        </a>
    @endforeach

</div>
