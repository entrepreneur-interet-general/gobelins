<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddAttributesToAuthors extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('authors', function (Blueprint $table) {
            $table->date('date_of_birth')->nullable();
            $table->integer('year_of_birth')->nullable();
            $table->date('date_of_death')->nullable();
            $table->integer('year_of_death')->nullable();
            $table->string('occupation')->nullable();
            $table->string('birthplace')->nullable();
            $table->string('deathplace')->nullable();
            $table->string('isni_uri')->nullable();
        });
    }
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('authors', function (Blueprint $table) {
            $table->dropColumn('date_of_birth');
            $table->dropColumn('year_of_birth');
            $table->dropColumn('date_of_death');
            $table->dropColumn('year_of_death');
            $table->dropColumn('occupation');
            $table->dropColumn('birthplace');
            $table->dropColumn('deathplace');
            $table->dropColumn('isni_uri');
        });
    }
}
