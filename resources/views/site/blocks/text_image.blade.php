<div class="TextImage @if($block->input('dark_bg')) on-dark-bg @endif @if($block->input('image_alignment') === 'right') TextImage--img-right @else TextImage--img-left @endif">

    <div class="has-decorative-bg"></div>

    <div class="TextImage__body">

        {!! $block->input('body') !!}

    </div>

    <div class="TextImage__images">
        @foreach($block->imagesAsArrays('side_images', 'default') as $image)
            
            <figure class="TextImage__figure">
                <img src="{{ $image['src'] }}" alt="{{ $image['alt'] }}" class="TextImage__img">
                @if($image['caption'])
                    <figcaption class="TextImage__figcaption">
                        {{ $image['caption'] }}
                    </figcaption>
                @endif
            </figure>

        @endforeach
    </div>
</div>
