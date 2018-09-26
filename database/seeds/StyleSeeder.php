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
            ['name' => 'Années 40'],
            ['name' => 'Années 50'],
            ['name' => 'Années 60'],
            ['name' => 'Années 70'],
            ['name' => 'Années 80'],
            ['name' => 'Années 90'],
            ['name' => 'Années 2000'],
            ['name' => 'Contemporain'],
        ];

        DB::table('styles')->insert($rows);
    }
}
