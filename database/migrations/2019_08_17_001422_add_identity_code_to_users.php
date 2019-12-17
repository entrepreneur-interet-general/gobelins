<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AddIdentityCodeToUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->smallInteger('identity_code')->nullable();
        });

        DB::table('users')->insert(
            array(
                'email' => 'documentation.mobilier@culture.gouv.fr',
                'name' => "Mobilier national",
                'identity_code' => \App\User::IDENTITY_MOBILIER_NATIONAL,
                'password' => Hash::make(env('MOB_NAT_USER_PASSWORD')),
                'api_token' => Str::random(60),
            )
        );
    }
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('identity_code');
        });
    }
}
