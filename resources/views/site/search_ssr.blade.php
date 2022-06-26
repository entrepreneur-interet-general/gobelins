@extends('layouts.default')

@section('content')

    @include('site._nav')
    
    <form action="{{ route('search') }}" method="get">
        <p>
            Rechercher dans les collections du Mobilier National:<br>
            <input type="text" name="q" value="{{ $query }}" />
            <button type="submit">Rechercher</button>
        </p>
        @php
        start_measure('filters', 'Render the filters');
        @endphp
        <div class="ProtoNav">

            <details class="ProtoNav__criteria">
                <summary>Type d’objet</summary>
                <fieldset style="column-count: 4">
                    @foreach($product_types as $product_type)
                        <label>
                            <input type="checkbox"
                                name="product_type_ids[]"
                                value="{{ $product_type->id }}"
                                {{ in_array($product_type->id, $product_type_ids) ? 'checked' : '' }}
                                >&nbsp;{{ $product_type->mapping_key }}&nbsp;{{ isset($aggregations['product_types'][$product_type->id]) ? '(' . $aggregations['product_types'][$product_type->id] . ')' : '' }}
                        </label><br>
                    @endforeach
                </fieldset>
            </details>

            @php
                start_measure('authors_filter', 'Render the  authors filters');
            @endphp
            <details class="ProtoNav__criteria">
                <summary>Auteurs</summary>
                <fieldset style="column-count: 4">
                    @foreach($authors as $author)
                        <label>
                            <input type="checkbox"
                                name="author_ids[]"
                                value="{{ $author->id }}"
                                {{ in_array($author->id, $author_ids) ? 'checked' : '' }}
                                >&nbsp;<b>{{ $author->last_name }}</b>&nbsp;{{ $author->first_name }}&nbsp;{{ isset($aggregations['authors'][$author->id]) ? '(' . $aggregations['authors'][$author->id] . ')' : '' }}
                        </label><br>
                    @endforeach
                </fieldset>
            </details>
            @php
                stop_measure('authors_filter');
            @endphp

            <details class="ProtoNav__criteria">
                <summary>Année de création</summary>

                <script src="https://unpkg.com/wnumb@1.1.0/wNumb.js"></script>
                <script src="https://unpkg.com/nouislider@11.1.0/distribute/nouislider.min.js"></script>
                <link rel="stylesheet" href="https://unpkg.com/nouislider@11.1.0/distribute/nouislider.min.css">

                <fieldset>
                    <div id="periods_range"></div>
                    <input type="hidden" id="period_start_year" name="period_start_year" value="">
                    <input type="hidden" id="period_end_year" name="period_end_year" value="">
                    <select id="periods_select">
                        @foreach($periods as $period)
                            <option value="{{ $period->start_year }}-{{ $period->end_year }}"
                                    {{ ($period_start_year >= $period->start_year && $period_end_year <= $period->end_year) ? 'selected' : '' }}>
                                {{ $period->name }}
                            </option>
                        @endforeach
                    </select>
                </fieldset>

                <script>
                    noUiSlider.create(periods_range, {
                        start: [ {{$period_start_year ?: $periods->first()->start_year}}, {{$period_end_year ?: $periods->last()->end_year}} ],
                        connect: true,
                        tooltips: [wNumb({decimals:0}), wNumb({decimals:0})],
                        step: 1,
                        range: {
                            'min': {{$periods->first()->start_year}},
                            'max': {{$periods->last()->end_year}}
                        }
                    });
                    periods_range.noUiSlider.on('update', (values_arr) => {
                        window.period_start_year.value = Math.round(values_arr[0]);
                        window.period_end_year.value = Math.round(values_arr[1]);
                    });

                    periods_select.addEventListener('change', (ev) => {
                        var years = ev.target.value.split('-');
                        periods_range.noUiSlider.set(years);

                    });
                </script>
            </details>

            <details class="ProtoNav__criteria">
                <summary>Styles</summary>
                <fieldset style="column-count: 4">
                    @foreach($styles as $style)
                        <label>
                            <input type="checkbox"
                                name="style_ids[]"
                                value="{{ $style->id }}"
                                {{ collect($style_ids)->contains($style->id) ? 'checked' : '' }}
                                >&nbsp;{{ $style->name }}&nbsp;{{ isset($aggregations['styles'][$style->id]) ? '(' . $aggregations['styles'][$style->id] . ')' : '' }}
                        </label><br>
                    @endforeach
                </fieldset>
            </details>

            <details class="ProtoNav__criteria">
                <summary>Matières</summary>
                <fieldset style="column-count: 4">
                    @foreach($materials as $material)
                        <label>
                            <input type="checkbox"
                                name="material_ids[]"
                                value="{{ $material->id }}"
                                {{ collect($material_ids)->contains($material->id) ? 'checked' : '' }}
                                >&nbsp;{{ $material->mapping_key }}&nbsp;{{ isset($aggregations['materials'][$material->id]) ? '(' . $aggregations['materials'][$material->id] . ')' : '' }}
                        </label><br>
                    @endforeach
                </fieldset>
            </details>

            <details class="ProtoNav__criteria">
                <summary>Lieux de production</summary>
                <fieldset style="column-count: 4">
                    @foreach($production_origins as $production_origin)
                        <label>
                            <input type="checkbox"
                                name="production_origin_ids[]"
                                value="{{ $production_origin->id }}"
                                {{ collect($production_origin_ids)->contains($production_origin->id) ? 'checked' : '' }}
                                >&nbsp;{{ $production_origin->name }}&nbsp;{{ isset($aggregations['production_origins'][$production_origin->id]) ? '(' . $aggregations['production_origins'][$production_origin->id] . ')' : '' }}
                        </label><br>
                    @endforeach
                </fieldset>
            </details>

            <details class="ProtoNav__criteria">
                <summary>Dimensions</summary>
                <fieldset>
                    Longueur : <input type="number" min="0" max="" step="0.1" name="length_or_diameter[gte]" value="{{$length_or_diameter_gte}}"> — <input type="number" min="0" max="" step="0.1" name="length_or_diameter[lte]" value="{{$length_or_diameter_lte}}"> mètres<br>
                    Largeur : <input type="number" min="0" max="" step="0.1" name="depth_or_width[gte]" value="{{$depth_or_width_gte}}"> — <input type="number" min="0" max="" step="0.1" name="depth_or_width[lte]" value="{{$depth_or_width_lte}}"> mètres<br>
                    Hauteur : <input type="number" min="0" max="" step="0.1" name="height_or_thickness[gte]" value="{{$height_or_thickness_gte}}"> — <input type="number" min="0" max="" step="0.1" name="height_or_thickness[lte]" value="{{$height_or_thickness_lte}}"> mètres<br>
                </fieldset>
                <style type="text/css">
                    input[type=number] {
                        width: 4em;
                    }
                </style>
            </details>

            <details>
                <summary>ES query</summary>
                <pre>{!! json_encode($es_query, JSON_PRETTY_PRINT) !!}</pre>
            </details>
        </div>
    </form>
    @php
        stop_measure('filters');
        start_measure('results', 'Render the results');
    @endphp

    <div>
        {{ $pagination->links() }}
    </div>

    <h2>Résultats</h2>
    @foreach($results as $result)
        <p style="overflow: auto;">
            <div style="float: right">
                @foreach($result->images as $img)
                    <img src="/image/{{ $img['path'] }}?h=100&amp;w=150" style="margin-left: 10px">
                @endforeach
            </div>

            <b>Inventaire :</b> {{ $result->inventory_id }}<br>

            <b>Titre ou dénomination :</b> {{ $result->title_or_designation }}<br>

            <b>Description :</b> {{ $result->description }}<br>

            <b>Type d’objet :</b>
            @if($result->product_types && is_array($result->product_types) && sizeof($result->product_types) > 0)
                {{ implode(', ', array_column($result->product_types, 'mapping_key')) }}
            @endif
            <br>

            <b>Auteurs :</b> 
            @if($result->authors && is_array($result->authors) && sizeof($result->authors) > 0)
                @foreach($result->authors as $author)
                    {{ $author['first_name'] }} {{ $author['last_name'] }},
                @endforeach
            @endif
            <br>

            <b>Époque de création :</b> {{ $result->period_start_year }} — {{ $result->period_end_year }}<br>

            <b>Année de création :</b> {{ $result->conception_year }}<br>

            <b>Style :</b>
            @if($result->style && isset($result->style['name']))
                {{ $result->style['name'] }}
            @endif
            <br>

            <b>Matières :</b>
            @if(is_array($result->materials) && sizeof($result->materials) > 0)
                {{ implode(', ', array_column($result->materials, 'mapping_key')) }}
            @endif
            <br>

            <b>Lieu de production :</b>
            @if($result->production_origin && isset($result->production_origin['name']))
                {{ $result->production_origin['name'] }}
            @endif
            <br>
            
            <b>Dimensions :</b> Longueur: {{$result->length_or_diameter}} — Largeur: {{$result->depth_or_width}} — Hauteur: {{$result->height_or_thickness}}<br>
        </p>
    @endforeach

    @php
        stop_measure('results');
    @endphp
@stop