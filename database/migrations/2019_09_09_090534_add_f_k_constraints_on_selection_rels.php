<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFKConstraintsOnSelectionRels extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('selection_user', function (Blueprint $table) {
            $table->dropForeign('selection_user_selection_id_foreign');
            $table->dropForeign('selection_user_user_id_foreign');

            $table->foreign('selection_id')
                  ->references('id')
                  ->on('selections')
                  ->onDelete('cascade'); // Add this !

            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade'); // Add this !
        });

        Schema::table('product_selection', function (Blueprint $table) {
            $table->dropForeign('product_selection_product_id_foreign');
            $table->dropForeign('product_selection_selection_id_foreign');

            $table->foreign('product_id')
                  ->references('id')
                  ->on('products')
                  ->onDelete('cascade'); // Add this !


            $table->foreign('selection_id')
                  ->references('id')
                  ->on('selections')
                  ->onDelete('cascade'); // Add this !
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
