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
            $table->string('model_class_name', 128)->nullable()->default(null);
            $table->integer('model_id')->nullable()->default(null);
            $table->string('related_model_class_name', 128)->nullable()->default(null);
            $table->integer('related_model_id')->nullable()->default(null);
            $table->string('type', 64);
            $table->string('ip_address', 64);
            $table->string('message', 64)->nullable()->default(null);
            $table->json('payload')->nullable()->default(null);
            $table->text('fields_affected')->nullable()->default(null);
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
