@extends('layouts.default')

@section('content')

@include('site._nav')

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

@stop