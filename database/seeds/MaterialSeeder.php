<?php

use Illuminate\Database\Seeder;
use \App\Models\Material;

class MaterialSeeder extends Seeder
{
    /**
     * Seed the database with our custom Material taxonomy.
     *
     * @return void
     */
    public function run()
    {
        $materials = file(__DIR__ . '/materials.tsv', FILE_IGNORE_NEW_LINES);
        collect($materials)->map(function ($line) {
            list($material_key, $comment) = explode("\t", $line);
            $is_textile_technique = $comment === 'TECHNIQUE TISSAGE' ? true : false;
            $types_arr = explode(' > ', $material_key);
            if (sizeof($types_arr) === 1) {
                Material::create([
                    'name' => $material_key,
                    'mapping_key' => $material_key,
                    'is_textile_technique' => $is_textile_technique,
                ]);
            } else {
                $parent_type_keys = collect($types_arr);
                $name = $parent_type_keys->pop();
                $parent_type_key = $parent_type_keys->implode(' > ');
                $parent = Material::where('mapping_key', $parent_type_key)->first();
                $parent->appendNode(new Material([
                    'name' => $name,
                    'mapping_key' => $material_key,
                    'is_textile_technique' => $is_textile_technique,
                ]));
            }
        });
    }
}
