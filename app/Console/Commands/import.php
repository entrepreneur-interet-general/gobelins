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
        $this->loadScom();
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
        $next_page = '/api/products';

        do {
            try {
                $response = $client->get($next_page);
                if ($response->getStatusCode() === 200) {
                    $this->comment('Received page: ' . $next_page);
                    
                    $json_resp = json_decode($response->getBody());
                    //var_dump($json_resp);
                    collect($json_resp->data)->map(function ($item) {
                        $this->comment('Upserting product: ' . $item->inventory_id);
                        \App\Models\Product::updateOrCreate(
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
                                // 'period_id' => $item->period_id,
                            ]
                        );
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
