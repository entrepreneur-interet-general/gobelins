<?php

// use Illuminate\Database\Seeder;
use Flynsarmy\CsvSeeder\CsvSeeder;

class StyleSeeder extends CsvSeeder
{
    public function __construct()
    {
        $this->table = 'styles';
        $this->csv_delimiter = "\t";
        $this->filename = base_path().'/database/seeds/styles.tsv';
    }

    public function run()
    {
        parent::run();
    }
}
