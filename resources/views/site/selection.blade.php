@extends('layouts.default')

@section('content')

@include('site._nav')

<div id="root">
    @include('site/_selection')
</div>

<script>
    var __INITIAL_STATE__ = @json($filters);

        @isset($selection_resource)
            var SELECTION_DETAIL = @json($selection_resource);
        @endisset

        @isset($currentUser)
            var CURRENT_USER = @json($currentUser);
        @endisset

        @if (session('status'))
            var SESSION_STATUS = @json(session('status'));
        @endif

</script>

@stop