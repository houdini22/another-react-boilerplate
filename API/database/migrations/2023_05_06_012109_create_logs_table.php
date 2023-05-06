<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('logs', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->string('model_class_name', 128)->nullable()->default(NULL);
            $table->integer('model_id')->nullable()->default(NULL);
            $table->string('type', 64);
            $table->string('message', 64)->nullable()->default(NULL);
            $table->timestamps();

            $table->index('user_id');
            $table->index(['model_class_name', 'model_id']);
            $table->index('type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('logs');
    }
}
