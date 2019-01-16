<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Illuminate\Support\Facades\DB;
use \App\Models\Image;

class RenameImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gobelins:renameimages';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Rename the broken image names (case sensitivity)';

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

        \App\Models\Image::where('path', 'like', '%.JPG')->chunk(500, function ($images) {
            foreach ($images as $img) {
                $path_db = public_path() . '/media/xl/' . $img->path;
                $path_borked = public_path() . '/media/xl/' . str_replace('.JPG', '.jpg', $img->path);

                if (!file_exists($path_db)) {
                    if (file_exists($path_borked)) {
                        rename($path_borked, $path_db);
                    }
                } else {
                    $this->progress_bar->clear();
                    $this->warn('Missing file: ' . $img->path);
                    $this->progress_bar->display();
                }
                $this->progress_bar->advance();
            }
        });


        $this->progress_bar->finish();
    }
}
