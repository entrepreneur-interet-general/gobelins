<?php

namespace App\Console\Commands;

use \App\Models\Author;
use Illuminate\Console\Command;

class FixNullAuthors extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gobelins:fixnullauthors';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fix authors with NULL last_name values';

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
        $authors = Author::whereNull('last_name')->get();
        $authors->map(function ($author) {
            $author->last_name = $author->composite_last_name;
            $author->save();
        });
    }
}
