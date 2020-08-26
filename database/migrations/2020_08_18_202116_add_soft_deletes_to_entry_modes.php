<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSoftDeletesToEntryModes extends Migration
{
    public function up()
    {
        Schema::table('entry_modes', function (Blueprint $table) {
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::table('entry_modes', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
}
