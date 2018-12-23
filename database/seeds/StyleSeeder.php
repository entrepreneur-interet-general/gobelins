<?php

use Illuminate\Database\Seeder;

class StyleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $rows = [
            ['name' => 'Louis XIII', 'legacy_id' => 16, 'order' => 1],
            ['name' => 'Louis XIV', 'legacy_id' => 17, 'order' => 2],
            ['name' => 'Régence', 'legacy_id' => 24, 'order' => 3],
            ['name' => 'Louis XV', 'legacy_id' => 18, 'order' => 4],
            ['name' => 'Transition', 'legacy_id' => 29, 'order' => 5],
            ['name' => 'Louis XVI', 'legacy_id' => 19, 'order' => 6],
            ['name' => 'Directoire', 'legacy_id' => 9, 'order' => 7],
            ['name' => 'Empire', 'legacy_id' => 10, 'order' => 8],
            ['name' => 'Restauration', 'legacy_id' => 26, 'order' => 9],
            ['name' => 'Louis-Philippe', 'legacy_id' => 20, 'order' => 10],
            ['name' => 'Napoléon III', 'legacy_id' => 21, 'order' => 11],
            ['name' => 'Art Déco', 'legacy_id' => 4, 'order' => 12],
            ['name' => 'Années 1940', 'legacy_id' => null, 'order' => 13],
            ['name' => 'Années 1950', 'legacy_id' => null, 'order' => 14],
            ['name' => 'Années 1960', 'legacy_id' => null, 'order' => 15],
            ['name' => 'Années 1970', 'legacy_id' => null, 'order' => 16],
            ['name' => 'Années 1980', 'legacy_id' => null, 'order' => 17],
            ['name' => 'Années 1990', 'legacy_id' => null, 'order' => 18],
            ['name' => 'Années 2000', 'legacy_id' => null, 'order' => 19],
            ['name' => 'Années 2010', 'legacy_id' => null, 'order' => 20],
            ['name' => 'Années 2020', 'legacy_id' => null, 'order' => 21],
            ['name' => 'Étranger', 'legacy_id' => 11, 'order' => 22],
        ];

        DB::table('styles')->insert($rows);
    }
}
