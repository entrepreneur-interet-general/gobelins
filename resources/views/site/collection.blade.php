
@extends('layouts.default')

@section('content')
    
    <div id="root">
        Chargement…
    </div>

    <script>
        var __INITIAL_STATE__ = {!! json_encode($filters) !!};
    </script>

@stop