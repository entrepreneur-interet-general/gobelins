
@extends('layouts.default')

@section('html_classes') has-uninitialized-BetaWelcome @endsection

@section('content')
    
    @include('site/_beta')

    <div id="root">
        {{--
        @isset($product)
            @include('site/_product')
        @else
            Chargement…
        @endisset
        --}}
    </div>

    <script>
        var __INITIAL_STATE__ = {!! $filters->toJson() !!};


        @isset($product)
            var PRODUCT = {!! $product !!};
        @endisset

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