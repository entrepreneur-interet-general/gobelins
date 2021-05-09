<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Selection;
use App\User;
use Artesaos\SEOTools\Facades\JsonLd;
use ES;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use SEO;
use \App\Http\Resources\SelectionCollection;

class SearchController extends Controller
{
    private static $RESULTS_PER_PAGE = 25;

    /**
     * Search page
     * Gather filter data, and boot the React app.
     */
    public function index(Request $request, $inventory_id = null)
    {
        $product = null;
        if ($request->route()->named('product') || $request->route()->named('product_zoom')) {
            $product = Product::published()->byInventory($inventory_id)->firstOrFail();

            SEO::setTitle($product->seoTitle);
            SEO::setDescription($product->seoDescription);
            JsonLd::setType('CreativeWork');
            $seoImages = $product->seoImages;
            if ($seoImages) {
                SEO::opengraph()->addImages($seoImages);
                SEO::twitter()->setImage($seoImages[0]);
                JsonLd::setImage($seoImages[0]);
            }

            $product = $product->toSearchableArray();
        };

        $my_selections = null;
        $mob_nat_selections = null;
        $user_selections = null;
        $mob_nat_user = User::where('identity_code', User::IDENTITY_MOBILIER_NATIONAL)->first();
        if ($request->route()->named('selections')) {
            $my_selections = Auth::check() ? new SelectionCollection(Auth::user()
                    ->selections()
                    ->orderBy('updated_at', 'DESC')
                    ->with(['users:id,name'])
                    ->paginate(4)
                    ->withPath(route('api.mySelections'))) : null;
            $mob_nat_selections = new SelectionCollection($mob_nat_user->selections()
                    ->public()
                    ->orderBy('updated_at', 'DESC')
                    ->with('users:id,name,email')
                    ->paginate(4)
                    ->withPath(route('api.mobNatSelections')));
            $user_selections = new SelectionCollection(Selection::with('users:id,name,email')
                    ->public()
                    ->whereDoesntHave('users', function ($q) {
                        $q->where('identity_code', User::IDENTITY_MOBILIER_NATIONAL);
                    })
                    ->orderBy('selections.updated_at', 'DESC')
                    ->paginate(4)
                    ->withPath(route('api.userSelections')));
        }

        $selection_detail = null;
        if ($request->route()->named('selection_detail')) {
            $selection_id = (int) $request->selection_id;
            $selection_detail = Selection::find($selection_id);
            $this->authorize('view', $selection_detail);
            $selection_detail = $selection_detail ? $selection_detail->toSearchableArray() : null;
        }

        $currentUser = null;
        if (Auth::check()) {
            $user = Auth::user();
            $currentUser = $user->toSearchableArray();
            $currentUser['api_token'] = $user->api_token;
        }

        return view('site.search', [
            'product' => $product,
            'my_selections' => $my_selections,
            'mob_nat_selections' => $mob_nat_selections,
            'user_selections' => $user_selections,
            'selection_detail' => $selection_detail,
            'currentUser' => $currentUser,
        ]);
    }

    public function search(Request $request)
    {
        $query = ES::type("products");

        $filters = [];

        $inventory_roots = Cache::rememberForever('distinct_inventory_roots', function () {
            $out = Product::select('inventory_root')
                ->published()
                ->distinct()
                ->get()
                ->map(function ($p) {
                    return $p->inventory_root;
                })
                ->sort()->values()->implode('|');
            return '(' . $out . ')';
        });

        $product_type_ids = [];
        if (is_array($request->input('product_type_ids'))) {
            $product_type_ids = $request->input('product_type_ids');
            $filters[] = ['terms' => ['product_types.id' => $product_type_ids]];
        }

        $style_ids = [];
        if (is_array($request->input('style_ids'))) {
            $style_ids = $request->input('style_ids');
            $filters[] = ['terms' => ['style.id' => $style_ids]];
        }

        $author_ids = [];
        if (is_array($request->input('author_ids'))) {
            $author_ids = $request->input('author_ids');
            $filters[] = ['terms' => ['authors.id' => $author_ids]];
        }

        $period_start_year = false;
        $period_end_year = false;
        if (is_numeric($request->input('period_start_year')) && is_numeric($request->input('period_end_year'))) {
            $period_start_year = (int) $request->input('period_start_year');
            $period_end_year = (int) $request->input('period_end_year');
            $filters[] = [
                'bool' => [
                    'must' => [
                        ['bool' => [
                            'must' => [
                                ['range' => ['period_start_year' => ['lt' => $period_end_year]]],
                                ['range' => ['period_end_year' => ['gt' => $period_start_year]]],
                            ],
                        ]],
                        ['bool' => [
                            'must' => [
                                ['range' => ['conception_year' => ['lte' => $period_end_year]]],
                                ['range' => ['conception_year' => ['gte' => $period_start_year]]],
                            ],
                        ]],
                    ],
                ],
            ];
        }

        $material_ids = [];
        if (is_array($request->input('material_ids'))) {
            $material_ids = $request->input('material_ids');
            $filters[] = ['terms' => ['materials.id' => $material_ids]];
        }

        $production_origin_ids = [];
        if (is_array($request->input('production_origin_ids'))) {
            $production_origin_ids = $request->input('production_origin_ids');
            $filters[] = ['terms' => ['production_origin.id' => $production_origin_ids]];
        }

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
                        'missing' => 1,
                    ],
                    'query' => [
                        // Filter terms are boolean AND i.e. "must".
                        'bool' => [],
                    ],
                ],
            ],
        ];
        if ($request->input('q')) {
            if (preg_match('/^' . $inventory_roots . '[- \/][0-9]+[- \/][0-9]{3}$/i', $request->input('q'), $matches)) {
                // Inventory id exact match
                $body['query']['function_score']['query']['bool']['must'] = [
                    'match' => [
                        'inventory_id_as_keyword' => str_replace([' ', '/'], '-', strtoupper($request->input('q'))),
                    ],
                ];
            } else {
                // Full text search
                // Refine the multi-term multi-match searches such as:
                // commode riesener, cartonnier boulle, lits directoire,
                // chaises paulin, fauteuil corbusiser,
                // Coquillages au bord de la mer, etc.
                // Not using 'default_operator' => 'AND' because of this:
                // https://github.com/elastic/elasticsearch/issues/29148#issuecomment-376458216
                // Another option would be to use `copy_to` to merge all
                // relevant fields together, but then we'd loose boosting.
                // See: https://stackoverflow.com/questions/57904019/elasticsearch-and-in-query-string-vs-default-operator-and
                if (preg_match('/([(:"]| \+| -)/', $request->input('q')) || preg_match('/\b(AND|OR|NOT)\b/', $request->input('q'))) {
                    $q = $request->input('q');
                } else {
                    // Tokenize by splitting on spaces or dashes
                    // use-case : "Notre-dame"
                    $a = mb_split(' |-', strtolower($request->input('q')));
                    // Strip stop words
                    $stopwords = ['de', 'du', 'le', 'la',
                        'et', 'da', 'l', 'd', 'van',
                        'von', 'der', 'au', 'pour',
                        'sur', 'à', 'a', 'en', 'par'];
                    $f = array_filter($a, function ($item) use ($stopwords) {
                        return !in_array($item, $stopwords);
                    });
                    // Force boolean AND operator.
                    $q = implode(' AND ', $f);
                }

                // Remove all forward slashes, that are interpreted
                // as regular expression searches.
                $q = str_replace('/', ' ', $q);

                $body['query']['function_score']['query']['bool']['must'] = [
                    'query_string' => [
                        'query' => $q,
                        'fields' => [
                            'authors.last_name^3',
                            'product_types.name^10',
                            // 'product_types.name^3',
                            'materials.name^10',
                            'inventory_id^3',
                            'period_name^2',
                            'style.name^2',
                            'conception_year_as_text^10',
                            'production_origin.name^2',
                            'title_or_designation^2',
                            'denomination^2',
                            'description',
                            'authors.first_name',
                            'acquisition_origin',
                            'legacy_inventory_number',
                            'bibliography',
                        ],
                    ],
                ];
            }
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
            ],
        ];
        foreach ($aggregated_filters as $k => $v) {
            $body['aggs']['all']['aggs'][$k] = [
                'terms' => [
                    'field' => $v,
                    'size' => 5000,
                ],
            ];
        };

        if (sizeof($filters) === 0 && empty($request->input('q'))) {
            // Randomize the default results.
            // TODO: store the seed client-side, to have consistent
            // random scoring across pagination.
            $body["query"] = [
                "function_score" => [
                    "functions" => [
                        ["random_score" => ["seed" => time()]],
                    ],
                ],
            ];
            $body["sort"] = [['image_quality_score' => 'desc'], '_score'];
        }

        if (\App::environment(['local', 'staging'])) {
            $body['explain'] = true;
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

        return json_encode([
            'hasMore' => $pagination->hasMorePages(),
            'nextPageUrl' => $pagination->nextPageUrl(),
            'totalHits' => $pagination->total(),
            'hits' => $query->take(self::$RESULTS_PER_PAGE)->get()->toArray(),
            'queryBody' => \App::environment(['local', 'staging']) ? $query->getBody() : 'filtered',
            // 'aggs' => $aggs,
        ]);
    }
}
