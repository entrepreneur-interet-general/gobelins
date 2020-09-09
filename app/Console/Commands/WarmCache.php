<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
// use GuzzleHttp\Client;
// use GuzzleHttp\Psr7;
// use GuzzleHttp\Psr7\Request;
// use GuzzleHttp\Pool;

// use GuzzleHttp\Exception\RequestException;

use Image;
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
    protected $description = 'Preprocess image thumbnails for grid view';

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
        // $this->progress_bar = $this->output->createProgressBar(Product::count());

        Product::with(['images'])->chunk(100, function ($prods) {
            foreach ($prods as $prod) {
                $img = $prod->posterImage;
                if ($img) {
                    $xl_path = '/media/xl/' . $img->path;
                    $thumb_path = public_path() . Image::url($xl_path, 600);
                    if (!file_exists($thumb_path)) {
                        echo "Target: $xl_path\n";
                        Image::make($xl_path, ['width' => 600])->save($thumb_path);
                    }
                    #ImageOptimizer::optimize($thumb_path);
                }
                // $this->progress_bar->advance();
            }
        });

        // $this->progress_bar->finish();
    }
}
