<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class RefreshSelectionPosterImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gobelins:refresh-selections';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Refresh the thumbnail images of selections.';

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
        \App\Models\Selection::all()->each(function ($s) {
            $s->refreshPosterImages();
        });
    }
}
