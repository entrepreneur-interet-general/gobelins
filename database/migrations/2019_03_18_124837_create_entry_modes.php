<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEntryModes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('entry_modes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('legacy_id')->unsigned()->unique();
            $table->string('name');
            $table->timestamps();
        });
        Schema::table('products', function (Blueprint $table) {
            $table->integer('entry_mode_id')->nullable();
            $table->foreign('entry_mode_id')->references('id')->on('entry_modes')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('entry_modes');
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign('products_entry_mode_id_foreign');
            $table->dropColumn('entry_mode_id');
        });
    }
}
