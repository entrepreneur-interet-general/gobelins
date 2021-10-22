<div class="Definition @if($block->input('dark_bg')) on-dark-bg @endif">

    <div class="has-decorative-bg"></div>

    <dl class="Definition__inner">

        <dt class="Definition__term">
            Définition {{ $block->input('term') }} :
        </dt>

        <dd class="Definition__description">
            {{ $block->input('description') }}
        </dd>
    
    </dl>

</div>
