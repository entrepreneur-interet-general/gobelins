@php
$first_img = $product['images'] ? $product['images'][0] : null;
$num_images = sizeof($product['images']);
$orientation = 'landscape';
if ($first_img) {
    $orientation = $first_img['width'] < $first_img['height'] ? 'portrait' : 'landscape';
}
@endphp
<article class="Detail">

    <div class="Detail has-{{ $orientation }}-poster {{ $num_images === 1 ? 'has-single-image' : '' }}">
        
        <div class="Detail__left-zone">

            <div class="BackToCollection">
                <a href="{{route('search')}}" class="BackToCollection__button">
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L1 9.52236" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 1L1 9.47764" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <line x1="18.5" y1="9.5" x2="1.5" y2="9.5" stroke="#333333" stroke-linecap="round"/>
                    </svg>
                    <span class="BackToCollection__label">
                        Collection du <b>Mobilier national</b>
                    </span>
                </a>
            </div><!-- /.BackToCollection -->
            
    
    
            <section class="DetailMainImage">
                <figure class="DetailMainImage__fig {{ $num_images === 0 ? 'has_no_image' : ''}}">

                    @if($num_images)
                    <img src="{{ Image::url('/media/xl/' . $product['images'][0]['path'], 600) }}" alt="" class="DetailMainImage__img">
    
                    <div class="DetailMainImage__toolbar">
                        <button type="button" class="DetailMainImage__button">
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.1531 11.9984C6.92395 11.9984 4.3062 9.5363 4.3062 6.49918C4.3062 3.46207 6.92395 1 10.1531 1C13.3823 1 16 3.46207 16 6.49918C16 9.5363 13.3823 11.9984 10.1531 11.9984Z" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M6.37695 10.8672L1.00059 15.9983" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <button type="button" class="DetailMainImage__button">
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.4121 7.34766L8.14603 13.2252" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M1.84766 7.34766L8.11374 13.2252" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <line x1="8.26172" y1="0.5" x2="8.26172" y2="12.7245" stroke="#333333" stroke-linecap="round"/>
                                <line x1="0.5" y1="16.5" x2="16.5" y2="16.5" stroke="#333333" stroke-linecap="round"/>
                            </svg>
                        </button>
                    </div>
                    @endif
    
                </figure>
            </section><!-- /.DetailMainImage -->
    
            @if($num_images > 1)
            <ul class="DetailImageList">
                @foreach($product['images'] as $img)
                <li>
                    <img src="{{ Image::url('/media/xl/' . $img['path'], 160) }}" alt="">
                    <link rel="preload" href="{{ Image::url('/media/xl/' . $img['path'], 600) }}" as="image">
                </li>
                @endforeach
            </ul><!-- /.DetailImageList -->
            @endif

        </div><!-- /.Detail__left-zone -->


        <div class="Detail__right-zone">
            

            <h1 class="DetailTitle">
                <span class="DetailTitle__denomination">{{ $product['denomination'] }}</span>
                <span  class="DetailTitle__title_or_designation">{{ $product['title_or_designation'] }}</span>
            </h1><!-- /.DetailTitle -->

            <div class="Detail__right-zone-dblcol">

                <section class="DetailData">
                    <div class="DetailData__unit">
                        <span class="DetailData__label">Numéro d’inventaire</span>
                        <span class="DetailData__datum">{{ $product['inventory_id'] }}</span>
                    </div>
                    @isset($product['authors'])
                    <div class="DetailData__unit">
                        <span class="DetailData__label">Auteurs</span>
                        <span class="DetailData__datum">
                            {{ 
                                collect($product['authors'])
                                ->map(function($a) {
                                    return $a['first_name'] . ' ' . $a['last_name'];
                                })->implode(', ')
                            }}
                        </span>
                    </div>
                    @endisset
                    @isset($product['conception_year'])
                    <div class="DetailData__unit">
                        <span class="DetailData__label">Année de conception</span>
                        <span class="DetailData__datum">{{ $product['conception_year'] }}</span>
                    </div>
                    @endisset
                    @isset($product['style'])
                    <div class="DetailData__unit">
                        <span class="DetailData__label">Style</span>
                        <span class="DetailData__datum">{{ $product['style']['name'] }}</span>
                    </div>
                    @endisset
                    @isset($product['product_types'])
                    <div class="DetailData__unit">
                        <span class="DetailData__label">Types</span>
                        <span class="DetailData__datum">
                            {{ 
                                collect($product['product_types'])
                                ->map(function($pt) {
                                    return $pt['name'];
                                })->implode(', ')
                            }}
                        </span>
                    </div>
                    @endisset
                    @isset($product['period'])
                    <div class="DetailData__unit">
                        <span class="DetailData__label">Époque</span>
                        <span class="DetailData__datum">{{ $product['period']['name'] }}</span>
                    </div>
                    @endisset
                    @if(null !== isset($product['materials']) && sizeof($product['materials']))
                    <div class="DetailData__unit">
                        <span class="DetailData__label">Types</span>
                        <span class="DetailData__datum">
                            {{ 
                                collect($product['materials'])
                                ->map(function($pt) {
                                    return $pt['name'];
                                })->implode(', ')
                            }}
                        </span>
                    </div>
                    @endif
                    @if(null !== isset($product['production_origin']) && sizeof($product['production_origin']))
                    <div class="DetailData__unit">
                        <span class="DetailData__label">Manufacture et atelier</span>
                        <span class="DetailData__datum">{{ $product['production_origin']['name'] }}</span>
                    </div>
                    @endif
                    @if(0 !== sizeof(array_filter([ $product['length_or_diameter'], $product['height_or_thickness'], $product['depth_or_width'] ])) )
                    <div class="DetailData__unit">
                        <span class="DetailData__label">Dimensions (L × l × h) en mètres</span>
                        <span class="DetailData__datum">{{ join(' × ',array_filter([ $product['length_or_diameter'], $product['height_or_thickness'], $product['depth_or_width'] ])) }}</span>
                    </div>
                    @endif
                    @isset($product['acquisition_date'])
                    <div class="DetailData__unit">
                        <span class="DetailData__label">Acquisition</span>
                        <span class="DetailData__datum">
                            {{ $product['acquisition_date'] }}
                            {{ $product['acquisition_mode'] }}
                        </span>
                    </div>
                    @endisset
                    
                </section><!-- /.DetailData -->


                <section class="DetailInfo">
                    @isset($product['description'])
                    <div class="DetailInfo__unit">
                        <span class="DetailData__label">Description</span>
                        <span class="DetailData__datum">
                            {!! nl2br($product['description']) !!}
                        </span>
                    </div>
                    @endisset
                    @isset($product['bibliography'])
                    <div class="DetailInfo__unit">
                        <span class="DetailData__label">Bibliographie</span>
                        <span class="DetailData__datum">
                            {!! nl2br($product['bibliography']) !!}
                        </span>
                    </div>
                    @endisset
                </section><!-- /.DetailInfo -->

            </div>
        </div>

    </div>


</article>
