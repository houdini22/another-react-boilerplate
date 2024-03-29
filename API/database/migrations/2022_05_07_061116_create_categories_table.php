<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tree_id');
            $table->string('category_name', 256)->default('');
            $table->string('category_url', 512)->default(null)->nullable();
            $table->string('category_meta_title', 256)->nullable()->default(null);
            $table->string('category_meta_keywords', 512)->nullable()->default(null);
            $table->string('category_meta_robots', 64)->nullable()->default(null);
            $table->string('category_meta_description', 512)->nullable()->default(null);
            $table->integer('category_hits')->default(0);
            $table->integer('category_unique_hits')->default(0);
            $table->unsignedBigInteger('index_document_id')->default(null)->nullable();
            $table->unsignedBigInteger('menu_category_id')->default(null)->nullable();

            $table->timestamps();

            //$table->foreign('tree_id')->references('id')->on('tree');
            $table->index('tree_id');
            $table->index('menu_category_id');
            $table->index('index_document_id');
            $table->index('category_name');
            $table->index('category_url');
        });

        //Schema::table('tree', function(Blueprint $table) {
        //    $table->foreign('category_id')->references('id')->on('categories');
        //});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categories');
    }
}
