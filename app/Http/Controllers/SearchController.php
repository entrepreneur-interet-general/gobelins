<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductType;
use App\Models\Author;
use App\Models\Period;
use App\Models\Style;
use App\Models\Material;
use App\Models\ProductionOrigin;
use ES;
use Illuminate\Support\Facades\Cache;

class SearchController extends Controller
{
    private static $RESULTS_PER_PAGE = 25;
    
    public function collection(Request $request)
    {
        $filters = Cache::rememberForever('collection_filters', function () {
            return collect([
                'productTypes' => ProductType::get()->toTree(),
                'styles' => Style::orderBy('name', 'asc')->select('id', 'name')->get(),
                'authors' => Author::orderBy('last_name', 'asc')
                                ->select('id', 'first_name', 'last_name')->get()
                                ->map(function ($item) {
                                    $item->last_name = ucwords(strtolower($item->last_name));
                                    return $item;
                                })
                                ->groupBy(function ($item, $key) {
                                    return strtoupper($item->last_name[0]);
                                })
                                ->sortBy(function ($item, $key) {
                                    return $key;
                                }),
                // 'periods' => Period::orderBy('start_year', 'asc')->get(),
                // TODO: put this in a seeder…
                'periods' => [
                    [
                        'name' => 'Henri IV',
                        'start_year' => 1589,
                        'end_year' => 1610,
                    ],
                    [
                        'name' => 'Louis XIII',
                        'start_year' => 1610,
                        'end_year' => 1643,
                    ],
                    [
                        'name' => 'Louis XIV',
                        'start_year' => 1643,
                        'end_year' => 1715,
                    ],
                    [
                        'name' => 'Louis XV',
                        'start_year' => 1723,
                        'end_year' => 1774,
                    ],
                    [
                        'name' => 'Louis XVI',
                        'start_year' => 1774,
                        'end_year' => 1792,
                    ],
                    [
                        'name' => 'Directoire et Consulat',
                        'start_year' => 1795,
                        'end_year' => 1804,
                    ],
                    // [
                    //     'name' => 'Directoire',
                    //     'start_year' => 1795,
                    //     'end_year' => 1799,
                    // ],
                    // [
                    //     'name' => 'Consulat',
                    //     'start_year' => 1799,
                    //     'end_year' => 1804,
                    // ],
                    [
                        'name' => 'Empire',
                        'start_year' => 1804,
                        'end_year' => 1815,
                    ],
                    [
                        'name' => 'Restauration',
                        'start_year' => 1815,
                        'end_year' => 1830,
                    ],
                    [
                        'name' => 'Louis-Philippe',
                        'start_year' => 1830,
                        'end_year' => 1848,
                    ],
                    [
                        'name' => 'Napoléon III',
                        'start_year' => 1848,
                        'end_year' => 1870,
                    ],
                ],
                // 'materials' => Material::all(),
                'materials' => Material::get()->toTree(),
                'productionOrigins' => ProductionOrigin::all(),
                'dimensions' => [
                    'max_height_or_thickness' => ceil(Product::max('height_or_thickness')),
                    'max_depth_or_width' => ceil(Product::max('depth_or_width')),
                    'max_length_or_diameter' => ceil(Product::max('length_or_diameter')),
                ]
            ]);
        });

        return view('site.collection', [
            'filters' => $filters
        ]);
    }

    public function index(Request $request)
    {
        $query = ES::type("products");
        
        $filters = [];

        
        // $product_types = ProductType::all();
        $product_type_ids = [];
        if (is_array($request->input('product_type_ids'))) {
            $product_type_ids = $request->input('product_type_ids');
            $filters[] = ['terms' => ['product_types.id' => $product_type_ids]];
        }
        
        // $styles = Style::all();
        $style_ids = [];
        if (is_array($request->input('style_ids'))) {
            $style_ids = $request->input('style_ids');
            $filters[] = ['terms' => ['style.id' => $style_ids]];
        }

        // $authors = Author::orderBy('last_name', 'asc')->select('id', 'first_name', 'last_name')->get();
        $author_ids = [];
        if (is_array($request->input('author_ids'))) {
            $author_ids = $request->input('author_ids');
            $filters[] = ['terms' => ['authors.id' => $author_ids]];
        }
        
        // $periods = Period::orderBy('start_year', 'asc')->get();
        $period_start_year = false;
        $period_end_year = false;
        if (is_numeric($request->input('period_start_year')) && is_numeric($request->input('period_end_year'))) {
            $period_start_year = (int) $request->input('period_start_year');
            $period_end_year = (int) $request->input('period_end_year');
            $filters[] = [
                'bool' => [
                    'must' => [
                        ['range' => ['period_start_year' => ['lte' => $period_end_year]]],
                        ['range' => ['period_end_year' => ['gte' => $period_start_year]]],
                    ]
                ]
            ];
            $filters[] = [
                'bool' => [
                    'must' => [
                        ['range' => ['conception_year' => ['lte' => $period_end_year]]],
                        ['range' => ['conception_year' => ['gte' => $period_start_year]]],
                    ]
                ]
            ];
        }

        // $materials = Material::all();
        $material_ids = [];
        if (is_array($request->input('material_ids'))) {
            $material_ids = $request->input('material_ids');
            $filters[] = ['terms' => ['materials.id' => $material_ids]];
        }

        // $production_origins = ProductionOrigin::all();
        $production_origin_ids = [];
        if (is_array($request->input('production_origin_ids'))) {
            $production_origin_ids = $request->input('production_origin_ids');
            $filters[] = ['terms' => ['production_origin.id' => $production_origin_ids]];
        }


        // $dimensions = collect(['length_or_diameter', 'depth_or_width', 'height_or_thickness']);
        // $sanitized_dimensions = [];
        // $dimensions->filter(function ($d) use ($request) {
        //     return $request->$d;
        // })->map(function ($d) use ($request, &$filters, &$sanitized_dimensions) {
        //     foreach (['gte', 'lte'] as $comparator) {
        //         if (isset($request->input($d)[$comparator]) && is_numeric($request->input($d)[$comparator])) {
        //             $filters[] = ['range' => [$d => [$comparator => (float) $request->input($d)[$comparator]]]];
        //             $sanitized_dimensions[$d . '_' . $comparator] = (float) $request->input($d)[$comparator];
        //         }
        //     }
        // });
        $dimensions = collect(['length_or_diameter_lte',
                               'length_or_diameter_gte',
                               'depth_or_width_lte',
                               'depth_or_width_gte',
                               'height_or_thickness_lte',
                               'height_or_thickness_gte']);
        $sanitized_dimensions = [];
        $dimensions->filter(function ($d) use ($request) {
            return $request->$d;
        })->map(function ($d) use ($request, &$filters, &$sanitized_dimensions) {
            $dim = substr($d, 0, -4);
            $comparator = substr($d, -3, 3);
            if (is_numeric($request->input($d))) {
                $filters[] = ['range' => [$dim => [$comparator => (float) $request->input($d)]]];
                $sanitized_dimensions[$d] = (float) $request->input($d);
            }
        });
        
        $body = [
            'query' => [
                'function_score' => [
                    'boost_mode' => 'sum', // For when we have an initial score of 0.
                    'field_value_factor' => [
                        // Display products with good images first, then bad images, then those without images.
                        'field' => 'image_quality_score',
                        'factor' => 1.2,
                        'missing' => 1
                    ],
                    'query' => [
                        // Filter terms are boolean AND i.e. "must".
                        'bool' => []
                    ]
                ]
            ]
        ];
        if ($request->input('q')) {
            $body['query']['function_score']['query']['bool']['must'] = [
                'multi_match' => [
                    'query' => $request->input('q'),
                    'fields' => [
                        'title_or_designation',
                        'description',
                        'inventory_id^3',
                        'conception_year_as_text^2',
                        'authors.first_name',
                        'authors.last_name^10',
                        'product_types.name^10',
                        'period_name^2',
                        'style.name^2',
                        'materials.name^10',
                        'production_origin.name^2',
                        'acquisition_origin',
                        'legacy_inventory_numbers.number',
                        'legacy_inventory_numbers.comment',
                    ],
                ],
            ];
        }
        if (sizeof($filters) > 0) {
            $body['query']['function_score']['query']['bool']['filter'] = $filters;
        }

        // Aggregations.
        $aggregated_filters = [
            'product_types' => 'product_types.id',
            'authors' => 'authors.id',
            'styles' => 'style.id',
            'materials' => 'materials.id',
            'production_origins' => 'production_origin.id',
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
                    'field' => $v,
                    'size' => 5000,
                ]
            ];
        };
        
        if (sizeof($filters) === 0 && empty($request->input('q'))) {
            // Randomize the default results.
            // TODO: store the seed client-side, to have consistent
            // random scoring across pagination.
            $body["query"] = [
                "function_score"=> [
                    "functions" => [
                        ["random_score"=> ["seed"=> time()]]
                    ]
                ]
            ];
            $body["sort"] = [['image_quality_score' => 'desc'], '_score'];
        }


        $pagination = $query->body($body)->paginate(self::$RESULTS_PER_PAGE);
        $raw_aggs = $query->response()['aggregations']['all'];
        
        $aggs = [];
        foreach ($aggregated_filters as $k => $v) {
            $buckets = $raw_aggs[$k]['buckets'];
            foreach ($buckets as $b) {
                $aggs[$k][$b['key']] = $b['doc_count'];
            }
        }


        if ($request->wantsJson()) {
            return json_encode([
                'hasMore' => $pagination->hasMorePages(),
                'nextPageUrl' => $pagination->nextPageUrl(),
                'totalHits' => $pagination->total(),
                'hits' => $query->take(self::$RESULTS_PER_PAGE)->get()->toArray(),
                'queryBody' => \App::environment(['local', 'staging']) ? $query->getBody() : 'filtered',
            ]);
        }
        
        $view = view('site.search', [
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

            'pagination' => $pagination,

        ]);
        return $view;
    }
}
