<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSectionsTables extends Migration
{
    public function up()
    {
        Schema::create('sections', function (Blueprint $table) {
            // this will create an id, a "published" column, and soft delete and timestamps columns
            createDefaultTableFields($table);

            // feel free to modify the name of this column, but title is supported by default (you would need to specify the name of the column Twill should consider as your "title" column in your module controller if you change it)
            $table->string('title', 200)->nullable();

            $table->integer('position')->unsigned()->nullable();

        });

        Schema::create('section_slugs', function (Blueprint $table) {
            createDefaultSlugsTableFields($table, 'section');
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->unsignedInteger('section_id')->nullable();
            $table->foreign('section_id')
                ->references('id')->on('sections')
                ->onDelete('set null');
        });

        collect([
            'Métier', 'Matière', 'Créateur', 'Histoires d’objet', 'Ameublement',
        ])->map(function ($item) {
            \App\Models\Section::firstOrCreate(['title' => $item]);
        });

    }

    public function down()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropForeign(['section_id']);
            $table->dropColumn('section_id');
        });
        Schema::dropIfExists('section_slugs');
        Schema::dropIfExists('sections');
    }
}
