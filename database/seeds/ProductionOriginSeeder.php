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
            [
                'name' => 'Manufacture des Gobelins',
                'label' => 'Création de tapisserie, technique point plat sur métier de haute lice',
                'label_md' => 'Création de tapisserie, technique *point plat* sur métier de *haute lice*',
                'mapping_key' => 'gobelins',
            ],
            [
                'name' => 'Manufacture de Beauvais',
                'label' => 'Création de tapisserie, technique de point plat sur métier de basse lice',
                'label_md' => 'Création de tapisserie, technique de *point plat* sur métier de *basse lice*',
                'mapping_key' => 'beauvais',
            ],
            [
                'name' => 'Manufacture de la Savonnerie',
                'label' => 'Création de tapis, technique point noué sur métier de haute lice',
                'label_md' => 'Création de tapis, technique *point noué* sur métier de *haute lice*',
                'mapping_key' => 'savonnerie',
            ],
            [
                'name' => 'Atelier Le Puy-en-Velay',
                'label' => 'Création de dentelle technique aux fuseaux',
                'label_md' => 'Création de *dentelle* technique aux *fuseaux*',
                'mapping_key' => 'puy-en-velay',
            ],
            [
                'name' => 'Atelier d’Alençon',
                'label' => 'Création de dentelle et broderie, technique à l’aiguille',
                'label_md' => 'Création de *dentelle et broderie*, technique à l’*aiguille*',
                'mapping_key' => 'alencon',
            ],
            [
                'name' => 'ARC',
                'label' => 'Atelier de recherche et création de mobilier',
                'label_md' => 'Atelier de recherche et création de *mobilier*',
                'mapping_key' => 'arc',
            ],
        ];

        DB::table('production_origins')->insert($rows);
    }
}
