<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConfigTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('config', function (Blueprint $table) {
            $table->id();
            $table->string('key', 512);
            $table->enum('type', ['number', 'string', 'object', 'array', 'boolean']);
            $table->text('value')->nullable()->default(null);
            $table->text('description')->nullable()->default(null);
            $table->string('model_type', 256);
            $table->boolean('is_editable')->default(true);
            $table->boolean('is_deletable')->default(true);
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
        Schema::dropIfExists('config');
    }
}
