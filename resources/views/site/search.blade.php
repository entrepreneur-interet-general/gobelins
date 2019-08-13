
@extends('layouts.default')

@section('html_classes') has-uninitialized-BetaWelcome @endsection

@section('content')
    
    @empty($product)
        @include('site/_beta')
    @endempty

    <div id="root">
        
        @isset($product)
            @include('site/_product')
        @else
            Chargement…
        @endisset
        
    </div>

    <script>
        var __INITIAL_STATE__ = {!! $filters->toJson() !!};


        @isset($product)
            var PRODUCT = {!! json_encode($product) !!};
        @endisset

        @isset($selections)
            var SELECTIONS = {!! json_encode($selections) !!};
        @endisset

        @isset($currentUser)
            var CURRENT_USER = {!! json_encode($currentUser) !!};
        @endisset

    </script>

    <script>
        function betaWelcomeRemover(ev) {
            if ((window.pageYOffset + 80) >= window.innerHeight) {
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