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
{{-- @dd(session()->flash('status')) --}}
<script>
    var __INITIAL_STATE__ = {!! $filters->toJson() !!};


        @isset($product)
            var PRODUCT = {!! json_encode($product) !!};
        @endisset

        @isset($mob_nat_selections, $user_selections)
            var SELECTIONS = {
                "mySelections": @json($my_selections),
                "mobNatSelections": @json($mob_nat_selections),
                "userSelections": @json($user_selections)
            };
        @endisset

        @isset($selection_detail)
            var SELECTION_DETAIL = {!! json_encode($selection_detail) !!};
        @endisset

        @isset($currentUser)
            var CURRENT_USER = {!! json_encode($currentUser) !!};
        @endisset

        @if (session('status'))
            var SESSION_STATUS = {!! json_encode(session('status')) !!};
        @endif

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