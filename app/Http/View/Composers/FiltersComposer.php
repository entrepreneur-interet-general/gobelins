<?php

namespace App\Http\View\Composers;

use Illuminate\Support\Facades\Cache;
use Illuminate\View\View;
use App\Models\Author;
use App\Models\Material;
use App\Models\ProductType;
use App\Models\Style;
use App\Models\ProductionOrigin;
use App\Models\Product;
use App\Models\Period;

class FiltersComposer
{
    public $filters;

    public function __construct()
    {
        $this->filters = Cache::rememberForever('collection_filters', function () {
            $authors = Author::has('products')
                                ->orderBy('last_name', 'asc')
                                ->select('id', 'first_name', 'last_name')->get()
                                ->map(function ($item) {
                                    $item->last_name = ucwords(strtolower($item->last_name));
                                    return $item;
                                });
            
            // The Authors list needs to have separator items, so that the
            // virtual list can be scrolled in the frontend. It makes sense
            // to pre-process them here, once.
            $separated_authors = collect([]);
            $authors->map(function ($item, $i) use (&$separated_authors, &$authors) {
                if ($i !== 0 && $item->last_name[0] !== $authors->get($i - 1)->last_name[0]) {
                    $separated_authors->push((object) [
                        'is_separator' => true,
                        'last_name' => '_', // Placeholder string, for offsets.
                    ]);
                }
                $separated_authors->push($item);
            });

            $i = 0;
            $authors_offsets = $separated_authors->reduce(function ($offsets, $item) use (&$i) {
                if ($offsets->count() === 0 || $item->last_name[0] !== $offsets->keys()->last()) {
                    $offsets->put($item->last_name[0], $i);
                }
                $i++;
                return $offsets;
            }, collect([]));

            $materials = Material::withCount('products')
                                        ->with('descendants')
                                        ->orderBy('is_textile_technique', 'asc')
                                        ->orderBy('name', 'asc')
                                        ->get()
                                        // We must filter manually, because using ::has('products') will remove root items.
                                        ->filter(function ($mat) {
                                            return $mat->children->isNotEmpty() ||  ($mat->children->isEmpty() && $mat->products_count > 0);
                                        })->toTree();

            $product_types = ProductType::withCount('products')
                                        ->with('descendants')
                                        ->orderBy('id', 'asc')
                                        ->get()
                                        // We must filter manually, because using ::has('products') will remove root items.
                                        ->filter(function ($pt) {
                                            return $pt->children->isNotEmpty() ||  ($pt->children->isEmpty() && $pt->products_count > 0);
                                        })->toTree();

            return collect([
                'productTypes' => $product_types,
                'styles' => Style::has('products')->orderBy('order', 'asc')->select('id', 'name')->get(),
                'authors' => $separated_authors,
                'authors_offsets' => $authors_offsets,
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
                'materials' => $materials,
                'productionOrigins' => ProductionOrigin::all(),
                'dimensions' => [
                    'max_height_or_thickness' => ceil(Product::max('height_or_thickness')),
                    'max_depth_or_width' => ceil(Product::max('depth_or_width')),
                    'max_length_or_diameter' => ceil(Product::max('length_or_diameter')),
                ]
            ]);
        });
    }

    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $view->with('filters', $this->filters);
    }
}
