<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use \App\Models\Product;

class HotFixVenteInTitleDesignation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gobelins:hotfixvente';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Corriger l’apparition du terme Vente dans les titres et appellations (hotfix - juillet 2020)';

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
        $query = Product::where('title_or_designation', 'like', '%FON - Vente%');
        $products = $query->get();
        echo "Correction de " . $products->count() . " fiches.\n";
        $products->map(function ($p) {
            echo ".";
            $clean = str_replace('FON - Vente', 'FON', $p->title_or_designation);
            $p->update(['title_or_designation' => $clean]);
        });
        echo "\nTerminé !\n";
    }
}
