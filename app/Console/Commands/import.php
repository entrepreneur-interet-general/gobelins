<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7;
use GuzzleHttp\Exception\RequestException;

class Import extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gobelins:import';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import the external data : SCOM, etc.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        // Temporarily deactivate Scout indexing.
        //\App\Models\Product::withoutSyncingToSearch(function () {
        $this->loadScom();
        //});
    }

    /**
     * Load the external SCOM data from the API.
     */
    private function loadScom()
    {
        $this->comment('Loading from datasource: ' . env('DATASOURCE_BASEURI'));

        $client = new Client([
            'base_uri' => env('DATASOURCE_BASEURI'),
            'timeout'  => 2.0,
        ]);

        // The root request endpoint.
        // All subsequent requests will be crawled from the next page in the response.
        // products?page=3033
        $next_page = '/api/products';

        do {
            try {
                $response = $client->get($next_page);
                if ($response->getStatusCode() === 200) {
                    $this->comment('Received page: ' . $next_page);
                    
                    $json_resp = json_decode($response->getBody());

                    collect($json_resp->data)->map(function ($item) {

                        // Handle core product data.
                        $this->comment('Upserting product: ' . $item->inventory_id);
                        $product = \App\Models\Product::updateOrCreate(
                            ['inventory_id' => $item->inventory_id],
                            [
                                'inventory_id' => $item->inventory_id,
                                'inventory_root' => $item->inventory_root,
                                'inventory_number' => $item->inventory_number,
                                'inventory_suffix' => $item->inventory_suffix,
                                'height_or_thickness' => $item->height_or_thickness,
                                'length_or_diameter' => $item->length_or_diameter,
                                'depth_or_width' => $item->depth_or_width,
                                'conception_year' => $item->conception_year,
                                'acquisition_origin' => $item->acquisition_origin,
                                'acquisition_date' => $item->acquisition_date,
                                'listed_as_historic_monument' => $item->listed_as_historic_monument,
                                'listed_on' => $item->listed_on,
                                'category' => $item->category,
                                'denomination' => $item->denomination,
                                'title_or_designation' => $item->title_or_designation,
                                'description' => $item->description,
                                'bibliography' => $item->bibliography,
                            ]
                        );
                            
                        // Images
                        $product->images->map(function ($img) {
                            $img->delete();
                        });
                        $product->images()->createMany(collect($item->images)->map(function ($img_obj) {
                            return (array) $img_obj;
                        })->toArray());


                        // ProductType
                        // We use the legacy SCOM 'gracat' name to map to a ProductType.
                        if ($item->product_type && $item->product_type->name) {
                            $product_type = \App\Models\ProductType::legacyType($item->product_type->name)->first();
                            if ($product_type) {
                                $product->productType()->associate($product_type);
                            }
                        }


                        // Drop all authorships
                        $product->authorships->map(function ($as) {
                            $as->delete();
                        });
                        
                        // Create authors
                        $authorships = collect($item->authorships);
                        $authorships->map(function ($as) {
                            \App\Models\Author::updateOrCreate(
                                ['legacy_id' => $as->author->id],
                                [
                                    'legacy_id' => $as->author->id,
                                    'name' => $as->author->name,
                                ]
                            );
                        });


                        // Create Authorships
                        \App\Models\Authorship::unguard();
                        $product->authorships()->createMany(
                            $authorships->map(function ($authorship_obj) {
                                return [
                                    'nature_code' => \App\Models\Authorship::authorNatureCode($authorship_obj->author_nature),
                                    'relevant_detail' => $authorship_obj->relevant_detail,
                                    'author_id' => \App\Models\Author::where('legacy_id', $authorship_obj->author->id)->first()->id,
                                ];
                            })->toArray()
                        );
                        \App\Models\Authorship::reguard();


                        // Period
                        // Periods might be updated in SCOM, so we udpate them based on the legacy_id
                        if ($item->period && $item->period->id) {
                            $period = \App\Models\Period::updateOrCreate(
                                ['legacy_id' => $item->period->id],
                                [
                                    'legacy_id' => $item->period->id,
                                    'name' => $item->period->name,
                                    'start_year' => $item->period->start_year,
                                    'end_year' => $item->period->end_year,
                                ]
                            );

                            if ($period) {
                                $product->period()->associate($period);
                            }
                        }


                        // LegacyInventoryNumbers
                        $product->legacyInventoryNumbers->map(function ($num) {
                            $num->delete();
                        });
                        $product->legacyInventoryNumbers()->createMany(collect($item->legacy_inventory_numbers)->map(function ($num) {
                            return [
                                'number' => $num->number,
                                'comment' => $num->comment,
                            ];
                        })->toArray());


                        // Finally, save the product relationships.
                        $product->save();
                    });

                    $next_page = $json_resp->links->next ?: false;
                } else {
                    $this->comment('Unfulfilled request :(');
                }
            } catch (ClientException $e) {
                echo Psr7\str($e->getRequest());
                echo Psr7\str($e->getResponse());
            }
        } while ($next_page !== false);
    }
}
