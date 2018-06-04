@extends('layouts.default')

@section('content')

    <form action="{{ route('search') }}" method="get">
        <p>
            Rechercher dans les collections du Mobilier National:<br>
            <input type="text" name="q" value="{{ $query }}" />
            <button type="submit">Rechercher</button>
        </p>
        <div class="ProtoNav">
            <details class="ProtoNav__criteria">
                <summary>Type d’objet</summary>
                <fieldset>
                    @foreach($product_types as $product_type)
                        <label>
                            <input type="checkbox"
                                name="product_type_ids[]"
                                value="{{ $product_type->id }}"
                                {{ collect($product_type_ids)->contains($product_type->id) ? 'checked' : '' }}
                                >&nbsp;{{ $product_type->mapping_key }}
                        </label><br>
                    @endforeach
                </fieldset>
            </details>
            <details class="ProtoNav__criteria">
                <summary>Auteurs</summary>
                <fieldset>
                    @foreach($authors as $author)
                        <label>
                            <input type="checkbox"
                                name="author_ids[]"
                                value="{{ $author->id }}"
                                {{ collect($author_ids)->contains($author->id) ? 'checked' : '' }}
                                >&nbsp;<b>{{ $author->lastName }}</b>&nbsp;{{ $author->firstName }}
                        </label><br>
                    @endforeach
                </fieldset>
            </details>
            <details>
                <summary>ES query</summary>
                <pre>{!! json_encode($es_query, JSON_PRETTY_PRINT) !!}</pre>
            </details>
        </div>
    </form>

    <h2>Résultats</h2>
    @foreach($results as $result)
        <p>
            <b>inventory_id :</b> {{ $result->inventory_id }}<br>
            <b>title_or_designation :</b> {{ $result->title_or_designation }}<br>
            <b>description :</b> {{ $result->description }}<br>
            <b>Type d’objet :</b> {{ $product_types->filter(function($t) use ($result) { return in_array($t->id, $result->product_type_ids); })->pluck('mapping_key')->implode(', ') }}<br>
            <b>Auteurs :</b> {{ $authors->filter(function($a) use ($result) { return in_array($a->id, $result->author_ids); })->pluck('name')->implode(', ') }}
        </p>
    @endforeach
    
@stop