<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSoftDeletesToPeriods extends Migration
{
    public function up()
    {
        Schema::table('periods', function (Blueprint $table) {
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::table('periods', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
}
