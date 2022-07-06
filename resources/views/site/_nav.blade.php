<div class="Nav">
    <button class="Nav__button" aria-label="Menu" type="button" id="open-nav-panel" data-a11y-dialog-show="nav_dialog">
        <img src="/images/logos/mn_gris.svg" alt="Mobilier National" height="11" width="38">
        menu
    </button>

    <div id="nav_dialog" aria-labelledby="nav-dialog-id" aria-hidden="true" class="Nav__container">
        <div data-a11y-dialog-hide class="Nav__backdrop"></div>
        <button type="button" data-a11y-dialog-hide aria-label="Fermer"  class="Nav__close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 1.2783L7.97158 7.89748M1.12398 14.9644L7.8928 8.07899M15.0019 14.7213L8.03036 8.1021M14.878 1.03516L8.10914 7.92059" stroke="#3338BA" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <div role="document" class="Nav__content">

            <div class="Nav__layout">
                <div class="Nav__top">

                    {{-- <div class="Nav__destination">
                        <a href="#" class="Nav__destination-title">
                            Accueil
                        </a>
                    </div> --}}

                    <div class="Nav__destination">
                        <a href="{{ route('search') }}" class="Nav__destination-title @route('search') is-active @endroute @route('product*') is-active @endroute @route('selection*') is-active @endroute">Collection</a>
                        <div class="Nav__destination-sections">
                            <a href="{{ route('search') }}" class="Nav__destination-section is-full-width">65 000 meubles, textiles, objets d’art</a>
                            <div class="Nav__destination-section-linebreak @route('selections') is-active @endroute"></div>
                            <a href="{{ route('selections') }}" class="Nav__destination-section is-full-width">Sélections d’objet</a>
                        </div>
                    </div>

                    <div class="Nav__destination">
                        <a href="{{ route('articles.home') }}" class="Nav__destination-title @route('articles.*') is-active @endroute">Encyclopédie des<br> savoir-faire</a>
                        <div class="Nav__destination-sections">
                            @foreach($nav as $section)
                                <a href="{{ route('articles.by_section', ['section' => $section['slug']]) }}" class="Nav__destination-section @route('articles.by_section', ['section' => $section['slug']]) is-active @endroute">
                                    {{ $section['title'] }}
                                </a>
                                @if($loop->even && !$loop->last)
                                    <div class="Nav__destination-section-linebreak"></div>
                                @endif
                            @endforeach
                        </div>
                    </div>

                    <div class="Nav__destination">
                        <a href="http://www.mobiliernational.culture.gouv.fr/" class="Nav__destination-title" target="_blank">L’institution</a>
                        <div class="Nav__destination-sections">
                            <a href="http://www.mobiliernational.culture.gouv.fr/fr/nous-connaitre/linstitution/presentation" class="Nav__destination-section" target="_blank">Nous connaître</a>
                            <a href="http://www.mobiliernational.culture.gouv.fr/fr/infos-pratiques?nid=25" class="Nav__destination-section" target="_blank">Préparer ma visite</a>
                            <div class="Nav__destination-section-linebreak"></div>
                            <a href="http://www.mobiliernational.culture.gouv.fr/fr/expositions-et-evenements/toutes-les-expositions" class="Nav__destination-section" target="_blank">Expositions</a>
                            <a href="http://www.mobiliernational.culture.gouv.fr/fr/actualites/actualites-du-mobilier-national" class="Nav__destination-section" target="_blank">Actualités</a>
                        </div>
                    </div>

                </div>

                <div class="Nav__footer">
                    <a href="{{ route('static_info') }}" class="Nav__info-link">Informations & mentions légales</a>
                    <img src="/images/logos/mn_gris.svg" alt="">
                    <span class="Nav__mn">mobilier national</span>

                </div>
            </div>
        </div>
    </div>
</div>
