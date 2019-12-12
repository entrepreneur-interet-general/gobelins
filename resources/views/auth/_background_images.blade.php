@section('html_classes') prevent-scroll @endsection

@section('end_body')
<script>
  const instance = Bricks({
    container: '#random_products_masonry_container',
    packed: "packed",
    sizes: [
      { columns: 2, gutter: 15 },
      { mq: "768px", columns: 3, gutter: 40 },
      { mq: "1025px", columns: 3, gutter: 80 },
      { mq: "1440px", columns: 3, gutter: 100 },
      { mq: "1600px", columns: 4, gutter: 85 },
      { mq: "2200px", columns: 5, gutter: 100 }
    ],
    position: true
  });
  instance.resize(false);
  instance.pack();
  let ticking = false;
  function resizeHandler() {
    if (!ticking) {
      window.requestAnimationFrame(forceRepack);
      ticking = true;
    }
  }
  function forceRepack() {
    instance.pack();
    ticking = false;
  }
  window.addEventListener("resize", resizeHandler);
</script>
@endsection



<div class="SelectionDetail__grid">
  <div class="SelectionDetail__masonry-container">
    <div id="random_products_masonry_container">
      @foreach ($random_products as $p)

      @php
      $has_images = sizeof($p['images']) > 0;

      $aspect_ratio = $has_images ? ($p['images'][0]['width'] / $p['images'][0]['height']) : 1;
      @endphp

      <a href="{{ route('product', ['inventory_id' => $p['inventory_id']]) }}"
        class="Collection__cell SelectionDetail__grid-item">

        @if ($has_images)
        <figure class="Collection__image-container" style="--aspect-ratio:{{ $aspect_ratio }};">
          <img loading="lazy"
            sizes="(min-width: 1800px) calc((100vw - 288px - (40px * 6)) / 6), (min-width: 1600px) and (max-width: 1799px) calc((100vw - 288px - (40px * 5)) / 5), (min-width: 1440px) and (max-width: 1599px) calc((100vw - 288px - (40px * 4)) / 4), (min-width: 1025px) and (max-width: 1439px) calc((100vw - 288px - (40px * 3)) / 3), (min-width: 800px) and (max-width: 1024px) calc((100vw - (40px * 4)) / 3), calc(100vw - (3 * 15px) / 2)"
            srcset="/media/xl{{ image_url(encodeURIComponent($p['images'][0]['path']), 330) }} 330w,
                                /media/xl{{ image_url(encodeURIComponent($p['images'][0]['path']), 600) }} 600w
            " />
        </figure>
        @else
        <div className="Collection__image-container--empty"></div>
        @endif


        <div class="Collection__cell-label">
          <h2 class="Collection__cell-title">{{ $p['title_or_designation'] }}</h2>
          <small class="Collection__cell-authors">{{ collect($p['authors'])->map(function ($a) { 
            return collect([$a['first_name'], $a['last_name']])->filter()->implode(' ');
            })->implode(', ') }}</small>
        </div>
      </a>
      @endforeach

    </div>
  </div>
</div>