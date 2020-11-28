<div class="GenericGrid__item">

    @if ($block->hasImage('generic_grid_image'))
        <figure class="GenericGrid__figure">
            <img
                src="{{ $block->image('generic_grid_image') }}"
                alt="{{ $block->imageAltText('generic_grid_image') }}"
                class="GenericGrid__item-image @if($block->input('circled_image')) GenericGrid__item-image--circled @endif">

            @if ($block->imageCaption('generic_grid_image'))
                <figcaption class="GenericGrid__figcaption">
                    {{ $block->imageCaption('generic_grid_image') }}
                </figcaption>
            @endif

        </figure>
    @endif

    <div class="GenericGrid__item-body">
        {!! $block->input('body') !!}
    </div>

</div>