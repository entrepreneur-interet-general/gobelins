<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7;
use GuzzleHttp\Exception\RequestException;
use Seld\Signal\SignalHandler;

class ImportUpdatedOn extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gobelins:importupdatedon';

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
    protected $signal_handle;

    /**
     * Log of processing error or remarks that should be
     * displayed in the terminal after exit;
     */
    protected $report = [];


    /**
     * Any shared HTTP options, like auth…
     */
    protected $http_options = [];


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
        //
    }
}
