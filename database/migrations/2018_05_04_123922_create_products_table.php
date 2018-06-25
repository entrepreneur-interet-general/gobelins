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
            
            // Physical properties, expressed in meters (millimeter precision).
            $table->decimal('height_or_thickness', 5, 3)->nullable();
            $table->decimal('length_or_diameter', 5, 3)->nullable();
            $table->decimal('depth_or_width', 5, 3)->nullable();
            
            // History
            $table->year('conception_year')->nullable();
            
            // Provenance
            $table->string('acquisition_origin')->nullable();
            $table->string('acquisition_date')->nullable();
            
            // Classification monuments historiques.
            $table->boolean('listed_as_historic_monument');
            $table->date('listed_on')->nullable();
            
            // Taxonomies
            $table->string('category')->nullable();
            $table->string('denomination')->nullable();
            $table->string('title_or_designation')->nullable();
            $table->integer('period_id')->unsigned()->nullable();
            $table->foreign('period_id')->references('id')->on('periods')->onDelete('set null');
            $table->integer('product_type_id')->unsigned()->nullable();
            $table->foreign('product_type_id')->references('id')->on('product_types')->onDelete('set null');

            // Content
            $table->text('description')->nullable();
            $table->text('bibliography')->nullable();

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
