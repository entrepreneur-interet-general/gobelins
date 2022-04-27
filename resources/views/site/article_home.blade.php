@extends('site.layouts.article')

@section('content')

    <div class="EncycloHome">

        <section class="EncycloHome__header">

            <div class="EncyloHome__header_illu">
                <video
                    src="/images/encyclo/encyclo_header_illu.m4v"
                    autoplay playsinline muted loop preload="auto"
                    alt="Les savoir-faire du Mobilier National"
                    class="EncycloHome__vid"></video>
            </div>

            <div class="EncycloHome__corp">


                {{-- Warning! meaningful line break, don't add whitespace here --}}
                <h1 class="EncycloHome__title">Encyclopédie des
savoir-faire</h1>

                <div class="EncycloHome__corp_sig">
                    <div class="EncycloHome__corp_logos">
                        <img src="/images/logos/marianne.svg" class="EncycloHome__marianne" alt="République française">

                        <img src="/images/logos/mn_gris.svg" class="EncycloHome__mn_gris" alt="Mobilier national">

                    </div>

                    <h2 class="EncyloHome__title_corp">mobilier national</h2>
                </div>


            </div>

            <div class="EncycloHome__intro" data->
                <p class="EncycloHome__intro_lines">
                    <span class="EncycloHome__line1">Découvrez</span>
                    <span class="EncycloHome__line2">nos <a href="#">
ateliers</a><span class="EncycloHome__comma">,</span></span>
                    <span class="EncycloHome__line3"><a href="#">techniques</a><span class="EncycloHome__comma">,</span></span>
                    <span class="EncycloHome__line4"><a href="#">histoires d’objets</a></span>
                    <span class="EncycloHome__line5">ou <a href="#">créateurs</a></span>
                </p>
                <p class="EncycloHome__layus">
                    Le Mobilier national vous propose son encyclopédie des savoir-faire. Cette institution nationale fait vivre 14 ateliers de créations et de restaurations. Dans ceux-ci se transmettent des savoir-faire sur les tapisserie, ébénisterie, teinture… Ici vous retrouverez un aperçu de ces métiers d’arts, leur technique, leur inovations.
                </p>
            </div>
        </section>

        <section class="EncycloHome__une">
            <h2 class="EncycloHome__section_title">À la une</h2>

            <ul class="EncycloHome__cardstack EncycloHome__cardstack--featured_primary">
                @include('site._card', ['article' => $featured_primary->first(), 'orientation' => 'horizontal'])
                @each('site._card', $featured_primary->take(-2), 'article')
            </ul>
        </section>

        <section class="EncycloHome__latest">
            <div class="EncycloHome__latest_top">
                <p class="EncycloHome__latest_title">
                    Artisans d’art, conservateurs, archivistes… du Mobilier national, vous proposent de nouvelles histoires :
                </p>
                <a href="#" class="EncycloHome__latest_link">Tout voir</a>
            </div>
            <ul class="EncycloHome__cardstack EncycloHome__cardstack--featured_secondary">
                @each('site._card', $featured_secondary, 'article')
            </ul>
        </section>

    

        @foreach($sections as $s)
            <section class="EncycloHome__section">
                <div class="EncycloHome__section-inner">
                    <div class="EncycloHome__section_top">
                        <h2 class="EncycloHome__section_title">
                            {{ $s->title }}
                        </h2>
                        <a href="#" class="EncycloHome__section_link">Tout voir</a>
                    </div>
                    <ul class="EncycloHome__section_stack">
                        @each('site._card', $section_articles[$s->slug], 'article')
                    </ul>
                </div>
            </section>
        @endforeach

        <div class="EncycloHome__prefoot">
            <p class="EncycloHome__prefoot_aside">
                L’encyclopédie des savoir-faire s’enrichie régulièrement de nouveaux  articles n’hésitez pas à revenir, ou <a href="mailto:documentation.mobilier@culture.gouv.fr">nous écrire</a> pour une demande particulière. Belle découverte.
                <span class="EncycloHome_aside_sig">
                    Le Mobilier national
                </span>
            </p>
            <img src="/images/encyclo/home_pre_footer_illu.jpg" alt="" class="EncycloHome__prefoot_img">
        </div>
    
    </div>

    @include('site._site_footer')

@stop