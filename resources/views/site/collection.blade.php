
@extends('layouts.default')

@section('content')
    
    <div id="root">
        Chargement…
    </div>

    <script>
        var __INITIAL_STATE__ = {!! $filters->toJson() !!};
    </script>

@stop