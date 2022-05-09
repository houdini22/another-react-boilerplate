<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLinksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('links', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tree_id');
            $table->string('link_name', 256);
            $table->string('link_url', 256);
            $table->string('link_target', 24);

            $table->timestamps();

            //$table->foreign('tree_id')->references('id')->on('tree');
            $table->index('link_name');
            $table->index('link_url');
        });

        //Schema::table('tree', function(Blueprint $table) {
        //    $table->foreign('link_id')->references('id')->on('links');
        //});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('links');
    }
}
