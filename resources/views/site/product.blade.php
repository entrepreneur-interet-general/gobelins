
@extends('layouts.default')

@section('content')

    @include('site._nav')
    
    <article class="Detail">

        <div class="DetailDesktop has-portrait-poster">
            
            <div class="DetailDesktop__left-zone">

                <div class="BackToCollection">
                <a href="{{route('collection')}}" class="BackToCollection__button">
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
                    <figure class="DetailMainImage__fig">
        
                        <img src="https://dummyimage.com/400x600" alt="" class="DetailMainImage__img">
        
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
        
                    </figure>
                </section><!-- /.DetailMainImage -->
        
        
                <ul class="DetailImageList">
                    <li>
                        <img src="https://dummyimage.com/160x160" alt="" width="80" height="80">
                    </li>
                    <li>
                        <img src="https://dummyimage.com/160x160" alt="" width="80" height="80">
                    </li>
                    <li>
                        <img src="https://dummyimage.com/160x160" alt="" width="80" height="80">
                    </li>
                </ul><!-- /.DetailImageList -->

            </div><!-- /.DetailDesktop__left-zone -->


            <div class="DetailDesktop__right-zone">
                

                <h1 class="DetailTitle">
                    <span class="DetailTitle__denomination">Dénomination chaise</span>
                    <span  class="DetailTitle__title_or_designation">appelation modèle Tina</span>
                </h1><!-- /.DetailTitle -->

                <div class="DetailDesktop__right-zone-dblcol">

                    <section class="DetailData">
                        <div class="DetailData__unit">
                            <span class="DetailData__label">Numéro d’inventaire</span>
                            <span class="DetailData__datum">GMC 6789 906</span>
                        </div>
                        <div class="DetailData__unit">
                            <span class="DetailData__label">Auteur</span>
                            <span class="DetailData__datum">Henriette Magnier</span>
                        </div>
                        <div class="DetailData__unit">
                            <span class="DetailData__label">Année de conception</span>
                            <span class="DetailData__datum">1200</span>
                        </div>
                        <div class="DetailData__unit">
                            <span class="DetailData__label">Époque de conception</span>
                            <span class="DetailData__datum">Louis XV</span>
                        </div>
                    </section><!-- /.DetailData -->


                    <section class="DetailInfo">
                        <div class="DetailInfo__unit">
                            <span class="DetailData__label">Description</span>
                            <span class="DetailData__datum">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo </span>
                        </div>
                        <div class="DetailInfo__unit">
                            <span class="DetailData__label">Biographie</span>
                            <span class="DetailData__datum">Remy (Gérald), l’Esprit et la Main, Paris, 2015, p.69. Marie-France Dupuy-Baylet, cat. exp. Beauvais, 2000, p.143,  n° 114.</span>
                        </div>
                    </section><!-- /.DetailInfo -->

                </div>
            </div>

        </div>


    </article>

@stop