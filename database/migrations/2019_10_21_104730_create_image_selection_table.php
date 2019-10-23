<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

use App\Models\Selection;

class CreateImageSelectionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('image_selection', function (Blueprint $table) {
            $table->integer('image_id');
            $table->integer('selection_id');
            $table->integer('order')->nullable();
            
            $table->foreign('image_id')
                  ->references('id')
                  ->on('images')
                  ->onDelete('cascade');
            
            $table->foreign('selection_id')
                  ->references('id')
                  ->on('selections')
                  ->onDelete('cascade');
        });

        Selection::all()->each(function ($s) {
            $s->refreshPosterImages();
            return true;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('image_selection');
    }
}
