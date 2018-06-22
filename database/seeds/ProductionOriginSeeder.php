<?php

use Illuminate\Database\Seeder;

class ProductionOriginSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $rows = [
            ['name' => 'Manufacture des Gobelins',                  'mapping_key' => 'gobelins'],
            ['name' => 'Manufacture de Beauvais',                   'mapping_key' => 'beauvais'],
            ['name' => 'Manufacture de la Savonnerie',              'mapping_key' => 'savonnerie'],
            ['name' => 'Ateliers d’Aubusson',                       'mapping_key' => 'aubusson'],
            ['name' => 'Dentelle Le Puy-en-Velay',                  'mapping_key' => 'puy-en-velay'],
            ['name' => 'Dentelle Alençon',                          'mapping_key' => 'alencon'],
            ['name' => 'Atelier de Recherche et de Création / ARC', 'mapping_key' => 'arc'],
        ];

        DB::table('production_origins')->insert($rows);
    }
}
