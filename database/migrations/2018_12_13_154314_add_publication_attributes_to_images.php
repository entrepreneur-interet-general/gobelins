<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPublicationAttributesToImages extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('images', function (Blueprint $table) {
            $table->boolean('is_published')->nullable();
            $table->boolean('is_prime_quality')->nullable();
            $table->boolean('is_documentation_quality')->nullable();
            $table->boolean('has_privacy_issue')->nullable();
            $table->boolean('has_marking')->nullable();
            $table->boolean('is_reviewed')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('images', function (Blueprint $table) {
            $table->dropColumn('is_published');
            $table->dropColumn('is_prime_quality');
            $table->dropColumn('is_documentation_quality');
            $table->dropColumn('has_privacy_issue');
            $table->dropColumn('has_marking');
            $table->dropColumn('is_reviewed');
        });
    }
}
