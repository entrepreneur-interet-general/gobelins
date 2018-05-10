<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            
            $table->increments('id');
            
            // Identification
            $table->string('inventory_id', 20)->unique();
            $table->string('inventory_root');
            $table->integer('inventory_number')->unsigned();
            $table->integer('inventory_suffix')->unsigned();
            
            // Physical properties
            $table->string('height_or_thickness');
            $table->string('length_or_diameter');
            $table->string('depth_or_width');
            
            // History
            $table->year('conception_year');
            
            // Provenance
            $table->string('acquisition_origin');
            $table->string('acquisition_date');
            
            // Classification monuments historiques.
            $table->boolean('listed_as_historic_monument');
            $table->year('listed_on');
            
            // Taxonomies
            $table->string('category');
            $table->string('denomination');
            $table->string('title_or_designation');
            $table->integer('period_id')->unsigned()->nullable();
            $table->foreign('period_id')->references('id')->on('periods')->onDelete('set null');

            // Content
            $table->text('description');
            $table->text('bibliography');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
