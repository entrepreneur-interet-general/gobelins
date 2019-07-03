<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductSelectionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_selection', function (Blueprint $table) {
            // $table->integer('order');
            $table->integer('product_id');
            $table->integer('selection_id');
            $table->foreign('product_id')->references('id')->on('products');
            $table->foreign('selection_id')->references('id')->on('selections');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_selection');
    }
}
