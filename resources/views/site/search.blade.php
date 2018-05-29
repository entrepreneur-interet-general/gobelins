@extends('layouts.default')

@section('content')

    <form action="{{ route('search') }}" method="get">
        <p>
            Rechercher dans les collections du Mobilier National:<br>
            <input type="text" name="q" value="{{ $query }}" />
        </p>
        <p>
            Type d’objet :<br>
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
        </p>
        <p>
            <button type="submit">Rechercher</button>
        </p>
    </form>

    <pre>{!! print_r($es_query) !!}</pre>

    @foreach($results as $result)
        <p>
            <b>inventory_id :</b> {{ $result->inventory_id }}<br>
            <b>title_or_designation :</b> {{ $result->title_or_designation }}<br>
            <b>description :</b> {{ $result->description }}<br>
            <b>Type d’objet :</b> {{ \App\Models\ProductType::find($result->product_type_ids[0])->mapping_key }}
        </p>
    @endforeach
    
@stop