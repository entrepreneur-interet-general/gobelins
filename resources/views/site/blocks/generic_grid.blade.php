
<div class="GenericGrid GenericGrid--{{ $block->input('columns') }}-cols @if($block->input('dark_bg')) on-dark-bg @endif">

    @foreach($block->children->filter(function($it) { return $it->type === 'generic_grid_item';}) as $item)

        @include('site.blocks.generic_grid_item', ['block' => $item])

    @endforeach

</div>
