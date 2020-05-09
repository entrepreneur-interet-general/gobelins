<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7;
use GuzzleHttp\Exception\RequestException;
// use Seld\Signal\SignalHandler;
use Illuminated\Console\Loggable;

use \App\Models\Product;

class ImportUpdatedOn extends Command
{
    use Loggable;


    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gobelins:importupdatedon {--from= : Start at given page}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import the `Updated on` attribute from datasource. Used to get started with the OAI repository, without having to re-import everything.';

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
    // protected $signal_handle;

    /**
     * Log of processing error or remarks that should be
     * displayed in the terminal after exit;
     */
    protected $report = [];
    
    
    /**
     * Any shared HTTP options, like auth…
     */
    protected $http_options = [
        'allow_redirects' => true,
    ];


    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();

        $this->http_options = array_merge($this->http_options, [
            'auth' => [
                config('app.datasource_username'),
                config('app.datasource_password'),
            ],
        ]);
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        // $this->signal_handle = SignalHandler::create();

        $this->initHttpClient();
        $this->setupProgressBar();
        $this->loadData();
    }

    private function initHttpClient()
    {
        $this->client = new Client([
            'base_uri' => config('app.datasource_baseuri'),
            'timeout'  => 30.0,
        ]);
    }



    private function setupProgressBar()
    {
        $response = $this->client->request('GET', '/api/products', $this->http_options);
        if ($response->getStatusCode() === 200) {
            $json_resp = json_decode($response->getBody());
            $this->progress_bar = $this->output->createProgressBar($json_resp->meta->total);
            $this->progress_bar->advance($json_resp->meta->from - 1);
        }
    }

    private function loadData()
    {
        $this->logInfo('Starting import from datasource…');
        
        // The root request endpoint.
        // All subsequent requests will be crawled from the next page in the response.
        // products?page=3033
        $next_page = '/api/products';
        if ($this->option('from')) {
            $this->logInfo('Resuming import from page ' . $this->option('from'));
            $next_page .= '?page=' . $this->option('from');
        }

        do {
            try {
                $response = $this->client->request('GET', $next_page, $this->http_options);
                if ($response->getStatusCode() === 200) {
                    $json_resp = json_decode($response->getBody());
                    $this->progress_bar->setProgress($json_resp->meta->from - 1);
                    $this->current_page = $json_resp->meta->current_page;
                    
                    collect($json_resp->data)->map(function ($item) {
                        $this->updateRecord($item);
                    });

                    $this->logInfo('Completed import of page ' . $this->current_page);

                    $next_page = $json_resp->links->next ?: false;
                }
            } catch (ClientException $e) {
                echo Psr7\str($e->getRequest());
                echo Psr7\str($e->getResponse());
            };
        } while ($next_page !== false);
    }

    private function updateRecord($item)
    {
        Product::withoutSyncingToSearch(function () use ($item) {
            Product::where('inventory_id', $item->inventory_id)
                   ->update(['legacy_updated_on' => $item->updated_on]);
        });

        $this->progress_bar->advance();
    }
}
