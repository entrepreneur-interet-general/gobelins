<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Pool;

use GuzzleHttp\Exception\RequestException;


use Illuminate\Support\Facades\DB;
use \App\Models\Product;

class WarmCache extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gobelins:warmcache';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Warm the nginx cache';


    /**
     * HTTP client instance.
     */
    protected $client;

    /**
     * UI: a Symfony Progress Bar instance.
     */
    protected $progress_bar;

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
        $this->initHttpClient();
        $this->fetchImages();
    }

    private function initHttpClient()
    {
        $this->client = new Client([
            'base_uri' => env('APP_URL'),
            'timeout'  => 15.0,
        ]);
    }

    private function fetchImages()
    {
        $http_options = env('HTTP_AUTH_USERNAME') ? ['auth' => [env('HTTP_AUTH_USERNAME'), env('HTTP_AUTH_PASSWORD')]] : null;
        $glide_params = '?q=40&fm=pjpg&cache=1&w=600';

        $this->progress_bar = $this->output->createProgressBar(Product::count());


        /////////////////////////////////
        // Consecutive single requests //
        /////////////////////////////////

        // Product::chunk(200, function ($prods) use ($glide_params, $http_options) {
        //     foreach ($prods as $prod) {
        //         $img = $prod->images->first();
        //         if ($img) {
        //             $response = $this->client->request('GET', '/image/' . $img->path . $glide_params, $http_options);
        //         }
        //         $this->progress_bar->advance();
        //     }
        // });


        ///////////////////////////////////
        // Pool of 4 concurrent requests //
        ///////////////////////////////////

        Product::chunk(200, function ($prods) use ($glide_params, $http_options) {
            $requests = function ($prods) use ($glide_params, $http_options) {
                foreach ($prods as $prod) {
                    $img = $prod->images->first();
                    if ($img) {
                        yield new Request('GET', '/image/' . $img->path . $glide_params, $http_options);
                    }
                }
            };

            $pool = new Pool($this->client, $requests($prods), [
                'concurrency' => 4,
                'fulfilled' => function () {
                    $this->progress_bar->advance();
                },
                'rejected' => function () {
                    $this->progress_bar->advance();
                },
            ]);

            $promise = $pool->promise();
            // Force the pool of requests to complete.
            $promise->wait();
        });





        $this->progress_bar->finish();
    }
}
