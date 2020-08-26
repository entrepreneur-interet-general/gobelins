<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSoftDeletesToProductionOrigins extends Migration
{
    public function up()
    {
        Schema::table('production_origins', function (Blueprint $table) {
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::table('production_origins', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
}
