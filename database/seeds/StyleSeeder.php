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
            ['name' => 'Louis XIII', 'mapping_key' => 'Louis XIII', 'legacy_id' => 16, 'order' => 1, 'start_year' => 1610, 'end_year' => 1661],
            ['name' => 'Louis XIV', 'mapping_key' => 'Louis XIV', 'legacy_id' => 17, 'order' => 2, 'start_year' => 1661, 'end_year' => 1715],
            ['name' => 'Régence', 'mapping_key' => 'Régence', 'legacy_id' => 24, 'order' => 3, 'start_year' => 1700, 'end_year' => 1730],
            ['name' => 'Louis XV', 'mapping_key' => 'Louis XV', 'legacy_id' => 18, 'order' => 4, 'start_year' => 1723, 'end_year' => 1750],
            ['name' => 'Transition', 'mapping_key' => 'Transition', 'legacy_id' => 29, 'order' => 5, 'start_year' => 1750, 'end_year' => 1774],
            ['name' => 'Louis XVI', 'mapping_key' => 'Louis XVI', 'legacy_id' => 19, 'order' => 6, 'start_year' => 1774, 'end_year' => 1785],
            ['name' => 'Directoire', 'mapping_key' => 'Directoire', 'legacy_id' => 9, 'order' => 7, 'start_year' => 1795, 'end_year' => 1803],
            ['name' => 'Empire', 'mapping_key' => 'Empire', 'legacy_id' => 10, 'order' => 8, 'start_year' => 1803, 'end_year' => 1821],
            ['name' => 'Restauration', 'mapping_key' => 'Restauration', 'legacy_id' => 26, 'order' => 9, 'start_year' => 1815, 'end_year' => 1830],
            ['name' => 'Louis-Philippe', 'mapping_key' => 'Louis-Philippe', 'legacy_id' => 20, 'order' => 10, 'start_year' => 1830, 'end_year' => 1848],
            ['name' => 'Napoléon III', 'mapping_key' => 'Napoléon III', 'legacy_id' => 21, 'order' => 11, 'start_year' => 1848, 'end_year' => 1870],
            ['name' => 'Art Déco', 'mapping_key' => 'Art Déco', 'legacy_id' => 4, 'order' => 12, 'start_year' => 1910, 'end_year' => 1930],
            ['name' => 'Années 1940', 'mapping_key' => 'Années 1940', 'legacy_id' => null, 'order' => 13, 'start_year' => 1940, 'end_year' => 1949],
            ['name' => 'Années 1950', 'mapping_key' => 'Années 1950', 'legacy_id' => null, 'order' => 14, 'start_year' => 1950, 'end_year' => 1959],
            ['name' => 'Années 1960', 'mapping_key' => 'Années 1960', 'legacy_id' => null, 'order' => 15, 'start_year' => 1960, 'end_year' => 1969],
            ['name' => 'Années 1970', 'mapping_key' => 'Années 1970', 'legacy_id' => null, 'order' => 16, 'start_year' => 1970, 'end_year' => 1979],
            ['name' => 'Années 1980', 'mapping_key' => 'Années 1980', 'legacy_id' => null, 'order' => 17, 'start_year' => 1980, 'end_year' => 1989],
            ['name' => 'Années 1990', 'mapping_key' => 'Années 1990', 'legacy_id' => null, 'order' => 18, 'start_year' => 1990, 'end_year' => 1999],
            ['name' => 'Années 2000', 'mapping_key' => 'Années 2000', 'legacy_id' => null, 'order' => 19, 'start_year' => 2000, 'end_year' => 2009],
            ['name' => 'Années 2010', 'mapping_key' => 'Années 2010', 'legacy_id' => null, 'order' => 20, 'start_year' => 2010, 'end_year' => 2019],
            ['name' => 'Années 2020', 'mapping_key' => 'Années 2020', 'legacy_id' => null, 'order' => 21, 'start_year' => 2020, 'end_year' => 2029],
            ['name' => 'Étranger', 'mapping_key' => 'Étranger', 'legacy_id' => 11, 'order' => 22, 'start_year' => null, 'end_year' => null],
        ];

        DB::table('styles')->insert($rows);
    }
}
