<div class="TextImage @if($block->input('dark_bg')) on-dark-bg @endif @if($block->input('image_alignment') === 'right') TextImage--img-right @else TextImage--img-left @endif">

    <div class="TextImage__body">

        {!! $block->input('body') !!}

    </div>

    <div class="TextImage__images">
        @foreach($block->imagesAsArrays('side_images', 'default') as $image)
            
            <figure class="TextImage__figure">
                <img src="{{ $image['src'] }}" alt="{{ $image['alt'] }}" width="100" class="TextImage">
                <figcaption class="TextImage__image-caption">
                    {{ $image['caption'] }}
                </figcaption>
            </figure>

        @endforeach
    </div>
</div>
