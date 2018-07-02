<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7;
use GuzzleHttp\Exception\RequestException;

class ImportAuthors extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gobelins:importauthors';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import only the authors from the datasource';

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
        $this->loadAuthors();
    }

    private function initHttpClient()
    {
        $this->client = new Client([
            'base_uri' => env('DATASOURCE_BASEURI'),
            'timeout'  => 5.0,
        ]);
    }

    private function loadAuthors()
    {
        $this->comment('Loading authors from datasource: ' . env('DATASOURCE_BASEURI'));
        $endpoint = '/api/authors';
        
        try {
            $response = $this->client->get($endpoint);
            if ($response->getStatusCode() === 200) {
                $json_resp = json_decode($response->getBody());
                collect($json_resp->data)->map(function ($author) {
                    $this->comment('Upserting author: ' . $author->name);
                    $author = \App\Models\Author::updateOrCreate(
                        ['legacy_id' => $author->id],
                        [
                            'name' => $author->name,
                            'first_name' => $author->first_name,
                            'last_name' => $author->last_name,
                        ]
                    );
                });
            } else {
                $this->comment('Unfulfilled request :(');
            }
        } catch (ClientException $e) {
            echo Psr7\str($e->getRequest());
            echo Psr7\str($e->getResponse());
        }
    }
}
