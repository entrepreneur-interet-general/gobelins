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
            <details class="ProtoNav__criteria">
                <summary>Époques</summary>

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

            <details>
                <summary>ES query</summary>
                <pre>{!! json_encode($es_query, JSON_PRETTY_PRINT) !!}</pre>
            </details>
        </div>
    </form>

    <h2>Résultats</h2>
    @foreach($results as $result)
        <p>
            <b>Inventaire :</b> {{ $result->inventory_id }}<br>
            <b>Titre ou dénomination :</b> {{ $result->title_or_designation }}<br>
            <b>Description :</b> {{ $result->description }}<br>
            <b>Type d’objet :</b> {{ $product_types->filter(function($t) use ($result) { return in_array($t->id, $result->product_type_ids); })->pluck('mapping_key')->implode(', ') }}<br>
            <b>Auteurs :</b> {{ $authors->filter(function($a) use ($result) { return in_array($a->id, $result->author_ids); })->pluck('name')->implode(', ') }}<br>
            <b>Époque de création :</b> {{ $result->period_start_year }} — {{ $result->period_end_year }}
        </p>
    @endforeach
    
@stop