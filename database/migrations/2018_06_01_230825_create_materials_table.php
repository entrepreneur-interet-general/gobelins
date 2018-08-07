<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMaterialsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('materials', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('mapping_key');
            $table->boolean('is_textile_technique');
            $table->nestedSet();

            $table->timestamps();
        });

        Schema::create('material_product', function (Blueprint $table) {
            $table->integer('material_id')->unsigned();
            $table->integer('product_id')->unsigned();
            $table->foreign('material_id')->references('id')->on('materials');
            $table->foreign('product_id')->references('id')->on('products');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('materials');
        Schema::dropIfExists('material_product');
    }
}
