<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class GenerateSitemaps extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:sitemaps';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate XML sitemaps';

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
        $start = microtime(true);

        // generate new sitemap file
        $sitemap = \App::make('sitemap');
        $counter = 0;
        $sitemapCounter = 0;
        $sitemaps_path = public_path().DIRECTORY_SEPARATOR.'sitemaps';


        // Add selections dynamic sitemap.
        $sitemap->addSitemap(secure_url(route('selections_sitemap', [], false)));

        \App\Models\Product::with('images')
            ->published()
            ->orderBy('id', 'asc')
            ->take(1000)
            ->chunk(10000, function ($products) use (&$sitemap, &$counter, &$sitemapCounter, &$sitemaps_path) {
                foreach ($products as $p) {
                    if ($counter == 10000) {
                        // generate new sitemap file
                        $sitemap->store('xml', 'sitemap-' . $sitemapCounter, $sitemaps_path);
                        // add the file to the sitemaps array
                        $sitemap->addSitemap(secure_url('sitemaps/sitemap-' . $sitemapCounter . '.xml'));
                        // reset items array (clear memory)
                        $sitemap->model->resetItems();
                        // reset the counter
                        $counter = 0;
                        // count generated sitemap
                        $sitemapCounter++;
                    }

                    $images = [];
                    if ($p->images) {
                        $images = $p->images->map(function ($i) {
                            $attrs = [
                                'url' => secure_url('/media/orig/' . $i->path),
                                // 'title' => '',
                                // 'caption' => '',
                            ];
                            // Not currently active with this package.
                            if (isset($i->licence) && $i->licence === 'LO 2.0') {
                                $attrs['license'] = 'https://github.com/etalab/licence-ouverte/blob/master/LO.md';
                            }
                            return $attrs;
                        })->all();
                    }
                    
                    // add product to items array
                    // $p->freq = 'weekly';
                    // $p->priority = '0.5';
                    $p->timestamp = $p->updated_at;
                    $p->permalink = secure_url(route('product', $p->inventory_id, false));
                    $sitemap->add($p->permalink, $p->timestamp, null, null, $images);
                    // count number of elements
                    $counter++;
                }
            });

        // you need to check for unused items
        if (!empty($sitemap->model->getItems())) {
            // generate sitemap with last items
            $sitemap->store('xml', 'sitemap-' . $sitemapCounter, $sitemaps_path);
            // add sitemap to sitemaps array

            $sitemap->addSitemap(secure_url('sitemaps/sitemap-' . $sitemapCounter . '.xml'));
            // reset items array
            $sitemap->model->resetItems();
        }

        // generate new sitemapindex that will contain all generated sitemaps above
        // Sitemaps are stored in a directory shared between deploys
        // (/var/www/gobelins/shared/sitemaps), see gobelins-devops repo.
        $sitemap->store('sitemapindex', 'sitemap', $sitemaps_path);

        $end = microtime(true);
        $this->info("Took ".($end - $start) ." seconds to complete\n");
    }
}
