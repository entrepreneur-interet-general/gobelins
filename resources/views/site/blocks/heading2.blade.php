<h2 class="Heading2 @if($block->input('dark_bg')) on-dark-bg @endif" data-js-jumpnav id="unique-@php echo rand() @endphp">

    <div class="has-decorative-bg"></div>
    
    <span class="Heading2__counter">
        <span class="Heading2__counter-index"></span>
        <span class="Heading2__counter-count"></span>
    </span>

    <span class="Heading2__title" data-js-jumpnav-title>
        {{ $block->input('heading2') }}
    </span>

</h2>
