<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7;
use GuzzleHttp\Exception\RequestException;
use Seld\Signal\SignalHandler;

class Import extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gobelins:import {--from= : Start at given page}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import the external data : SCOM, etc.';

    /**
     * HTTP client instance.
     */
    protected $client;

    /**
     * UI: a Symfony Progress Bar instance.
     */
    protected $progress_bar;

    /**
     * The API result page that is being analysed.
     */
    protected $current_page;

    /**
     * Instance of SignalHandler, used to gracefully exit
     * when sent a SIGINT (ctrl-c).
     */
    protected $signal_handle;

    /**
     * Log of processing error or remarks that should be
     * displayed in the terminal after exit;
     */
    protected $report = [];

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
        $this->signal_handle = SignalHandler::create();

        // Temporarily deactivate Scout indexing.
        //\App\Models\Product::withoutSyncingToSearch(function () {
        $this->initHttpClient();
        $this->setupProgressBar();
        $this->loadScom();
        //});
    }

    private function initHttpClient()
    {
        $this->client = new Client([
            'base_uri' => env('DATASOURCE_BASEURI'),
            'timeout'  => 2.0,
        ]);
    }

    private function setupProgressBar()
    {
        $response = $this->client->get('/api/products');
        if ($response->getStatusCode() === 200) {
            $json_resp = json_decode($response->getBody());
            $this->progress_bar = $this->output->createProgressBar($json_resp->meta->total);
            $this->progress_bar->advance($json_resp->meta->from - 1);
        }
    }

    /**
     * Load the external SCOM data from the API.
     */
    private function loadScom()
    {
        $this->comment('Loading from datasource: ' . env('DATASOURCE_BASEURI'));

        // The root request endpoint.
        // All subsequent requests will be crawled from the next page in the response.
        // products?page=3033
        $next_page = '/api/products';
        if ($this->option('from')) {
            $next_page .= '?page=' . $this->option('from');
        }

        do {
            try {
                $response = $this->client->get($next_page);
                if ($response->getStatusCode() === 200) {
                    // $this->comment('Received page: ' . $next_page);
                    
                    $json_resp = json_decode($response->getBody());
                    $this->progress_bar->setProgress($json_resp->meta->from - 1);
                    $this->current_page = $json_resp->meta->current_page;
                    
                    collect($json_resp->data)->map(function ($item) {
                        
                        // Handle core product data.
                        // $this->comment('Upserting product: ' . $item->inventory_id);
                        $this->progress_bar->setMessage('Upserting product: ' . $item->inventory_id);

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

                        $images = collect($item->images)
                            // Store full path of image file.
                            ->map(function ($img_obj) {
                                $img_obj->full_path = storage_path(env('MEDIA_STORAGE_PATH') . '/' . trim($img_obj->path));
                                return $img_obj;
                            })
                            // Remove items for which we don't have a file.
                            ->filter(function ($img_obj) use ($item) {
                                if (file_exists($img_obj->full_path)) {
                                    return true;
                                } else {
                                    $this->progress_bar->clear();
                                    $this->warn('Error on product: ' . $item->inventory_id);
                                    $this->warn('Missing image file: ' . $img_obj->full_path);
                                    $this->info('Current page:' . $this->current_page);
                                    $this->progress_bar->display();
                                    return false;
                                }
                            })
                            // Attempt to obtain dimensions of image.
                            ->map(function ($img_obj) {
                                list($width, $height) = @getimagesize($img_obj->full_path);
                                $img_obj->width = $width;
                                $img_obj->height = $height;
                                return $img_obj;
                            })
                            // Remove items that have corrupted image metatdata.
                            ->filter(function ($img_obj) use ($item) {
                                if ($img_obj->width && $img_obj->height) {
                                    return true;
                                } else {
                                    $this->progress_bar->clear();
                                    $this->warn('Error on product: ' . $item->inventory_id);
                                    $this->warn('Invalid image:' . $img_obj->full_path);
                                    $this->info('Current page:' . $this->current_page);
                                    $this->progress_bar->display();
                                    return false;
                                }
                            })
                            ->map(function ($img_obj) {
                                return (array) $img_obj;
                            })
                            ->toArray();

                        if (is_array($images) && sizeof($images) > 0) {
                            $product->images()->createMany($images);
                        }


                        // ProductType
                        // The API is sending a "name" attribute that is from 'gracat.gracat' in SCOM.
                        if ($item->product_type && $item->product_type->name) {
                            $product_type = \App\Models\ProductType::mappedFrom('gracat', $item->product_type->name)->first();

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


                        // Styles
                        // Also udpated based on the legacy_id
                        if ($item->product_style && $item->product_style->id) {
                            $style = \App\Models\style::updateOrCreate(
                                ['legacy_id' => $item->product_style->id],
                                [
                                    'legacy_id' => $item->product_style->id,
                                    'name' => $item->product_style->name,
                                ]
                            );

                            if ($style) {
                                $product->style()->associate($style);
                            }
                        }

                        // Materials
                        $product->materials()->detach();
                        if (is_array($item->materials) && sizeof($item->materials) > 0) {
                            $material_ids = collect($item->materials)
                                ->pluck('name')
                                ->map(function ($legacy_mat) {
                                    // Mapped from legacy SCOM "mat.mat" column.
                                    return \App\Models\Material::mappedFrom('mat', $legacy_mat)->get()->all();
                                })
                                ->flatten()
                                ->pluck('id')
                                ->all();
                            $product->materials()->attach($material_ids);
                        }



                        // Finally, save the product relationships.
                        $product->save();

                        $this->progress_bar->advance();
                    });

                    if ($this->signal_handle->isTriggered()) {
                        $this->progress_bar->clear();
                        $this->info(implode("\n", $this->report));
                        $this->warn('Interrupted at page ' . $this->current_page . '. To resume the import, run:');
                        $this->warn('$ php artisan gobelins:import -vvv --from=' . $this->current_page);
                        exit;
                    } else {
                        $next_page = $json_resp->links->next ?: false;
                    }
                } else {
                    $this->comment('Unfulfilled request :(');
                }
            } catch (ClientException $e) {
                echo Psr7\str($e->getRequest());
                echo Psr7\str($e->getResponse());
            }
        } while ($next_page !== false);

        if ($this->progress_bar) {
            $this->progress_bar->finish();
        }
    }
}
