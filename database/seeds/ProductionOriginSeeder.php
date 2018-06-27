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
                'label' => 'Atelier de création de tapisserie technique de la haute-lice',
                'label_md' => 'Atelier de création de *tapisserie* technique de la *haute-lice*',
                'mapping_key' => 'gobelins'
            ],
            [
                'name' => 'Manufacture de Beauvais',
                'label' => 'Atelier de création de tapisserie technique de la basse-lice',
                'label_md' => 'Atelier de création de *tapisserie* technique de la *basse-lice*',
                'mapping_key' => 'beauvais'
            ],
            [
                'name' => 'Manufacture de la Savonnerie',
                'label' => 'Atelier de création de tapis technique de la haute-lice',
                'label_md' => 'Atelier de création de *tapis* technique de la *haute-lice*',
                'mapping_key' => 'savonnerie'
            ],
            [
                'name' => 'Dentelle Le Puy-en-Velay',
                'label' => 'Atelier de création de dentelle technique des fuseaux',
                'label_md' => 'Atelier de création de *dentelle* technique des *fuseaux*',
                'mapping_key' => 'puy-en-velay'
            ],
            [
                'name' => 'Dentelle Alençon',
                'label' => 'Atelier de création de dentelle technique de l’aiguille',
                'label_md' => 'Atelier de création de *dentelle* technique de l’*aiguille*',
                'mapping_key' => 'alencon'
            ],
            [
                'name' => 'ARC',
                'label' => 'Atelier de recherche et création de mobilier',
                'label_md' => 'Atelier de recherche et création de *mobilier*',
                'mapping_key' => 'arc'
            ],
        ];

        DB::table('production_origins')->insert($rows);
    }
}
