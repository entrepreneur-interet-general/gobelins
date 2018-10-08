
@extends('layouts.default')

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
            <aside class="BetaWelcome__aparte BetaWelcome__purple">
                Le Mobilier national est une institution publique, héritière
                du garde-Meuble de la couronne, créé en 1604 par Henri IV
                et réorganisé par Louis XIV.
                Cette structure assure la conservation,
                restauration et création de ses collections.  
            </aside>
        </div>
    </section>
    <section id="rootWrapper" style="position: relative; top: 100vh; background-color: #fff;">
        <div id="root">
            Chargement…
        </div>
    </section>

    <script>
        var __INITIAL_STATE__ = {!! $filters->toJson() !!};
    </script>

    <script>
        window.addEventListener('scroll', betaWelcomeRemover);
        function betaWelcomeRemover(ev) {
            if (window.pageYOffset >= window.innerHeight) {
                document.querySelector('.BetaWelcome').style.display = 'none';
                window.rootWrapper.style.top = '0px';
                document.querySelector('.FilterPanelDesktop').style.position = 'fixed';
                // window.scroll(0, window.innerHeight - window.pageYOffset);
                window.scroll(0, 0);
                window.removeEventListener('scroll', betaWelcomeRemover);
            }
        }
    </script>

@stop