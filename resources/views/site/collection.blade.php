
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
            <aside class="BetaWelcome__aparte BetaWelcome__purple">
                Le Mobilier national est une institution publique, héritière
                du garde-Meuble de la couronne, créé en 1604 par Henri IV
                et réorganisé par Louis XIV.
                Cette structure assure la conservation,
                restauration et création de ses collections.  
            </aside>
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
            if (window.pageYOffset - 40 >= window.innerHeight) {
                removeBetaWelcome();
                // window.scroll(0, window.innerHeight - window.pageYOffset);
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