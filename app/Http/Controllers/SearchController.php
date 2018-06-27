<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductType;
use App\Models\Author;
use App\Models\Period;
use App\Models\Style;
use App\Models\Material;
use App\Models\ProductionOrigin;
use ES;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = ES::type("products");
        
        $filters = [];

        $product_types = ProductType::all();
        $product_type_ids = [];
        if (is_array($request->input('product_type_ids'))) {
            $product_type_ids = $request->input('product_type_ids');
            $filters[] = ['terms' => ['product_type_ids' => $product_type_ids]];
        }
        
        $styles = Style::all();
        $style_ids = [];
        if (is_array($request->input('style_ids'))) {
            $style_ids = $request->input('style_ids');
            $filters[] = ['terms' => ['style_id' => $style_ids]];
        }
        
        $authors = Author::orderBy('name', 'asc')->get();
        $author_ids = [];
        if (is_array($request->input('author_ids'))) {
            $author_ids = $request->input('author_ids');
            $filters[] = ['terms' => ['author_ids' => $author_ids]];
        }
        
        $periods = Period::orderBy('start_year', 'asc')->get();
        $period_start_year = false;
        $period_end_year = false;
        if (is_numeric($request->input('period_start_year')) && is_numeric($request->input('period_end_year'))) {
            $period_start_year = (int) $request->input('period_start_year');
            $period_end_year = (int) $request->input('period_end_year');
            $filters[] = [
                'bool' => [
                    'should' => [
                        ['range' => ['period_start_year' => ['lte' => $period_end_year]]],
                        [ 'bool' => ['must_not' => ['exists' => [ 'field' => 'period_start_year']]]],
                    ]
                ]
            ];
            
            $filters[] = [
                'bool' => [
                    'should' => [
                        ['range' => ['period_end_year' => ['gte' => $period_start_year]]],
                        [ 'bool' => ['must_not' => ['exists' => [ 'field' => 'period_end_year']]]],
                    ]
                ]
            ];
        }

        $materials = Material::all();
        $material_ids = [];
        if (is_array($request->input('material_ids'))) {
            $material_ids = $request->input('material_ids');
            $filters[] = ['terms' => ['material_ids' => $material_ids]];
        }

        $production_origins = ProductionOrigin::all();
        $production_origin_ids = [];
        if (is_array($request->input('production_origin_ids'))) {
            $production_origin_ids = $request->input('production_origin_ids');
            $filters[] = ['terms' => ['production_origin_id' => $production_origin_ids]];
        }


        $dimensions = collect(['length_or_diameter', 'depth_or_width', 'height_or_thickness']);
        $sanitized_dimensions = [];
        $dimensions->filter(function ($d) use ($request) {
            return $request->$d;
        })->map(function ($d) use ($request, &$filters, &$sanitized_dimensions) {
            foreach (['gte', 'lte'] as $comparator) {
                if (isset($request->input($d)[$comparator]) && is_numeric($request->input($d)[$comparator])) {
                    $filters[] = ['range' => [$d => [$comparator => (float) $request->input($d)[$comparator]]]];
                    $sanitized_dimensions[$d . '_' . $comparator] = (float) $request->input($d)[$comparator];
                }
            }
        });

        
        // Filter terms are boolean AND i.e. "must".
        $body = [
            'query' => [
                'bool' => []
            ]
        ];
        if ($request->input('q')) {
            $body['query']['bool']['must'] = [
                'multi_match' => [
                    'query' => $request->input('q'),
                    'fields' => [
                        'title_or_designation',
                        'description',
                        'inventory_id',
                        'conception_year',
                    ],
                ],
            ];
        }
        if (sizeof($filters) > 0) {
            $body['query']['bool']['filter'] = $filters;
        }

        // Aggregations.
        $aggregated_filters = [
            'product_types' => 'product_type_ids',
            'authors' => 'author_ids',
            'styles' => 'style_id',
            'materials' => 'material_ids',
            'production_origins' => 'production_origin_id',
        ];
        $body['aggs'] = [
            'all' => [
                'global' => (object) null,
                'aggs' => [],
            ]
        ];
        foreach ($aggregated_filters as $k => $v) {
            $body['aggs']['all']['aggs'][$k] = [
                'terms' => [
                    'field' => $v
                    ]
                ];
        };
        
        $query->body($body);
        
        $aggs = [];
        foreach ($aggregated_filters as $k => $v) {
            $buckets = $query->response()['aggregations']['all'][$k]['buckets'];
            foreach ($buckets as $b) {
                $aggs[$k][$b['key']] = $b['doc_count'];
            }
        }

        return view('site.search', [
            'query' => $request->input('q'),
            'es_query' => $query->getBody(),
            'product_types' => $product_types,
            'product_type_ids' => $product_type_ids,

            'authors' => $authors,
            'author_ids' => $author_ids,

            'periods' => $periods,
            'period_start_year' => $period_start_year,
            'period_end_year' => $period_end_year,

            'materials' => $materials,
            'material_ids' => $material_ids,

            'production_origins' => $production_origins,
            'production_origin_ids' => $production_origin_ids,

            'length_or_diameter_gte' => isset($sanitized_dimensions['length_or_diameter_gte']) ? $sanitized_dimensions['length_or_diameter_gte'] : null,
            'length_or_diameter_lte' => isset($sanitized_dimensions['length_or_diameter_lte']) ? $sanitized_dimensions['length_or_diameter_lte'] : null,
            'depth_or_width_gte' => isset($sanitized_dimensions['depth_or_width_gte']) ? $sanitized_dimensions['depth_or_width_gte'] : null,
            'depth_or_width_lte' => isset($sanitized_dimensions['depth_or_width_lte']) ? $sanitized_dimensions['depth_or_width_lte'] : null,
            'height_or_thickness_gte' => isset($sanitized_dimensions['height_or_thickness_gte']) ? $sanitized_dimensions['height_or_thickness_gte'] : null,
            'height_or_thickness_lte' => isset($sanitized_dimensions['height_or_thickness_lte']) ? $sanitized_dimensions['height_or_thickness_lte'] : null,

            'styles' => $styles,
            'style_ids' => $style_ids,
            
            'results' => $query->take(15)->get(),

            'aggregations' => $aggs,

        ]);
    }
}
