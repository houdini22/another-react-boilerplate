<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTreeFiles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tree_files', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tree_id');
            $table->unsignedBigInteger('file_id');
            $table->timestamps();

            //$table->foreign('tree_id')->references('id')->on('tree');
            $table->index('tree_id');
            $table->index('file_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tree_files');
    }
}
