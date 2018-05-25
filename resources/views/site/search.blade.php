@extends('layouts.default')

@section('content')

    <form action="{{ route('search') }}" method="get">
        Rechercher dans les collections du Mobilier National:<br>
        <input type="text" name="q" value="{{ $query }}" />
    </form>

    @foreach($results as $result)
        <p>
            <b>inventory_id :</b> {{ $result->inventory_id }}<br>
            <b>title_or_designation :</b> {{ $result->title_or_designation }}<br>
            <b>description :</b> {{ $result->description }}
        </p>
    @endforeach
    
@stop