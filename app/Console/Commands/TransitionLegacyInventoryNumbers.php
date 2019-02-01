<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use \App\Models\Product;

class TransitionLegacyInventoryNumbers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gobelins:legacynumbers';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Transition the data model of Legacy Inventory Numbers';

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
        $chunk = 500;
        $this->info('Retrieving products in chunks of ' . $chunk);
        $bar = $this->output->createProgressBar(Product::has('legacyInventoryNumbers')->count());
        $bar->start();

        // Product::withoutSyncingToSearch(function () use ($chunk, $bar) {
        Product::has('legacyInventoryNumbers')->with(['legacyInventoryNumbers'])->chunk($chunk, function ($prods) use ($bar) {
            foreach ($prods as $prod) {
                $leginv = $prod->legacyInventoryNumbers->first();
                if ($leginv) {
                    $prod->update(['legacy_inventory_number' => $leginv->comment]);
                }
                $bar->advance();
            }
        });
        // });

        $bar->finish();
    }
}
