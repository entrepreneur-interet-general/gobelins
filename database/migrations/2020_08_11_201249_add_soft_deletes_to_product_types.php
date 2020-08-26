<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSoftDeletesToProductTypes extends Migration
{
    public function up()
    {
        Schema::table('product_types', function (Blueprint $table) {
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::table('product_types', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
}
