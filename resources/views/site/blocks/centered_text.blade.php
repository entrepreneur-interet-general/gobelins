{{-- 
    This block is deprecated. We are leaving it here for backwards compatibility with legacy content already created.
 --}}
<div class="CenteredText @if($block->input('dark_bg')) on-dark-bg @endif @if($block->input('is_quote')) CenteredText--is_quote @endif">

    <div class="has-decorative-bg"></div>

    {!! $block->input('body') !!}

</div>
