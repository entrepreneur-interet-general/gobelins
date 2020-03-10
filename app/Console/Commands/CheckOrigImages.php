<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Illuminate\Support\Facades\DB;
use \App\Models\Image;

class CheckOrigImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gobelins:checkorigimages';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check that the files in the DB actually exist on disk (case sensitivity)';

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
        $this->processImages();
    }

    private function processImages()
    {
        $this->progress_bar = $this->output->createProgressBar(Image::count());

        \App\Models\Image::chunk(500, function ($images) {
            foreach ($images as $img) {
                $this->progress_bar->advance();

                $path = public_path() . '/media/orig/' . $img->path;

                if (!file_exists($path)) {
                    $this->progress_bar->clear();
                    $this->warn('Missing file ' . $path);
                    $this->progress_bar->display();
                    continue;
                }

                
                $parent_dir_name = dirname($path);
                $dir = glob($parent_dir_name . '/*');
                if (in_array($path, $dir, true)) {
                    continue;
                } else {
                    $this->progress_bar->clear();
                    $this->warn('Case error on file ' . $path);
                    var_dump($dir);
                    var_dump($path);
                    die();
                    $this->progress_bar->display();
                }
            }
        });


        $this->progress_bar->finish();
    }
}
