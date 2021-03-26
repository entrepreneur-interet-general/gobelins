<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCreditToMedias extends Migration
{
    public function up()
    {
        if (Schema::hasTable('medias')) {
            Schema::table('medias', function (Blueprint $table) {
                $table->string('credit')->nullable();
            });
        }
    }
    public function down()
    {
        if (Schema::hasTable('medias')) {
            Schema::table('medias', function (Blueprint $table) {
                $table->dropColumn('credit');
            });
        }
    }
}
