
<figure class="CenteredImage @if($block->input('dark_bg')) on-dark-bg @endif @if($block->input('full_width')) CenteredImage--full-width @endif">

    <div class="has-decorative-bg"></div>

    <img src="{{ $block->image('centered_image', 'desktop') }}" alt="{{ $block->imageAltText('centered_image') }}" class="CenteredImage__img">
    
    @if ($block->imageCaption('centered_image'))
        <figcaption class="CenteredImage__figcaption">
            {{ $block->imageCaption('centered_image') }}
        </figcaption>
    @endif

</figure>
