<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductionOriginsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('production_origins', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('label')->nullable();
            $table->string('label_md')->nullable();
            $table->string('mapping_key');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->unsignedInteger('production_origin_id')->nullable();
            $table->foreign('production_origin_id')
                    ->references('id')->on('production_origins')
                    ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['production_origin_id']);
            $table->dropColumn('production_origin_id');
        });
        Schema::dropIfExists('production_origins');
    }
}
