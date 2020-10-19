<div class="GenericGrid__item">

    @if ($block->hasImage('generic_grid_image'))
        <img
            src="{{ $block->image('generic_grid_image') }}"
            alt="{{ $block->imageAltText('generic_grid_image') }}"
            width='100'
            class="GenericGrid__item-image @if($block->input('circled_image')) GenericGrid__item-image--circled @endif">
    @endif

    <div class="GenericGrid__item-body">
        {!! $block->input('body') !!}
    </div>

</div>