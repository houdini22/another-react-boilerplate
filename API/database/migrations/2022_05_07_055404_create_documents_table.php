<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tree_id');
            $table->string('document_name', 256);
            $table->text('document_content')->nullable()->default(null);
            $table->string('document_url', 512)->nullable()->default(null);
            $table->string('document_meta_title', 256)->nullable()->default(null);
            $table->string('document_meta_keywords', 512)->nullable()->default(null);
            $table->string('document_meta_robots', 64)->nullable()->default(null);
            $table->string('document_meta_description', 512)->nullable()->default(null);
            $table->unsignedBigInteger('document_hits')->default(0);
            $table->unsignedBigInteger('document_unique_hits')->default(0);
            $table->unsignedBigInteger('menu_category_id')->default(null)->nullable();

            $table->timestamps();

            //$table->foreign('tree_id')->references('id')->on('tree');
            $table->index('tree_id');
            $table->index('menu_category_id');
            $table->index('document_name');
            $table->index('document_url');
            $table->index('document_meta_title');
            $table->index('document_meta_keywords');
            $table->index('document_meta_robots');
            $table->index('document_meta_description');
        });

        //Schema::table('tree', function(Blueprint $table) {
        //    $table->foreign('document_id')->references('id')->on('documents');
        //});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('documents');
    }
}
