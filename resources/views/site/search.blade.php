
@extends('layouts.default')

@section('html_classes') has-uninitialized-BetaWelcome @endsection

@section('content')
    <section class="BetaWelcome">
        <div class="BetaWelcome__inner">
            <header class="BetaWelcome__logo">
                @svg('logo_mn')
            </header>
            <div class="BetaWelcome__intro">
                <p>
                    Bienvenue sur la nouvelle interface d’exploration du <span class="BetaWelcome__purple">Mobilier national</span>.
                    Ce site est une <span class="BetaWelcome__salmon">version beta</span> en cours de développement, nous vous souhaitons
                    de belles découvertes en attendant les versions ultérieures.
                </p>
            </div>
            <div class="BetaWelcome__bottom">
                <aside class="BetaWelcome__aparte BetaWelcome__purple">
                    Le Mobilier national est une institution publique, héritière
                    du garde-Meuble de la couronne, créé en 1604 par Henri IV
                    et réorganisé par Louis XIV.
                    Cette structure assure la conservation,
                    restauration et création de ses collections.  
                </aside>
                <div class="BetaWelcome__arrow-container">
                    <svg width="15" height="16" viewBox="0 0 15 16" fill="none" class="BetaWelcome__arrow-down">
                        <path d="M14 9L7.5171 15" stroke="#FF9090" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M1 9L7.4829 15" stroke="#FF9090" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <line x1="7.5" y1="0.5" x2="7.5" y2="14.5" stroke="#FF9090" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>
    </section>
    <div id="root">
        Chargement…
    </div>

    <script>
        var __INITIAL_STATE__ = {!! $filters->toJson() !!};
    </script>

    <script>
        function betaWelcomeRemover(ev) {
            if ((window.pageYOffset + 256) >= window.innerHeight) {
                removeBetaWelcome();
                window.scrollTo(0, 0);
                window.localStorage.setItem('BetaWelcome', 'initialized');
                window.removeEventListener('scroll', betaWelcomeRemover);
            }
        }

        function removeBetaWelcome() {
            window.document.documentElement.classList.remove('has-uninitialized-BetaWelcome');
            window.document.documentElement.classList.add('has-initialized-BetaWelcome');
        }

        if (localStorage && localStorage.getItem('BetaWelcome') && localStorage.getItem('BetaWelcome') == 'initialized') {
            removeBetaWelcome();
        } else {
            window.addEventListener('scroll', betaWelcomeRemover);
        }

    </script>

@stop