<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSoftDeletesToStyles extends Migration
{
    public function up()
    {
        Schema::table('styles', function (Blueprint $table) {
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::table('styles', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
}
