<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('extension');
            $table->string('mime');
            $table->integer('width')->nullable()->default(null);
            $table->integer('height')->nullable()->default(null);
            $table->integer('size');
            $table->integer('preview_count')->default(0);
            $table->integer('download_count')->default(0);
            $table->string('file_path')->unique();
            $table->string('type')->default('');
            $table->string('alt', 255)->nullable()->default(null);
            $table->string('title', 255)->nullable()->default(null);
            $table->string('caption', 255)->nullable()->default(null);
            $table->string('class', 32);
            $table->string('user_id')->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('files');
    }
}
