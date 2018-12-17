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
            ['name' => 'Années 1930'],
            ['name' => 'Années 1940'],
            ['name' => 'Années 1950'],
            ['name' => 'Années 1960'],
            ['name' => 'Années 1970'],
            ['name' => 'Années 1980'],
            ['name' => 'Années 1990'],
            ['name' => 'Années 2000'],
            ['name' => 'Années 2010'],
        ];

        DB::table('styles')->insert($rows);
    }
}
