<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class CreateArticleRelatedArticle extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('article_related_article', function (Blueprint $table) {
            $table->integer('article_id');
            $table->integer('related_article_id');
            $table->integer('position');
            $table->foreign('article_id')->references('id')->on('articles')->onDelete('cascade');
            $table->foreign('related_article_id')->references('id')->on('articles')->onDelete('cascade');
            $table->index(['article_id', 'related_article_id'], 'idx_article_id_related_article_id_' . Str::random(5));

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('article_related_article');
    }
}
