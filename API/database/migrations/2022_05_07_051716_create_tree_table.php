<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTreeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tree', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id')->unsigned()->default(0);
            $table->unsignedBigInteger('document_id')->unsigned()->default(0);
            $table->unsignedBigInteger('link_id')->unsigned()->default(0);
            $table->string('tree_display_name', 64);
            $table->boolean('tree_is_visible_frontend')->default(true);
            $table->boolean('tree_is_visible_backend')->default(true);
            $table->boolean('tree_is_visible_in_select')->default(true);
            $table->boolean('tree_is_deletable')->default(true);
            $table->boolean('tree_is_editable')->default(true);
            $table->boolean('tree_has_edit_button')->default(true);
            $table->boolean('tree_is_viewable')->default(true);
            $table->boolean('tree_url_is_showable')->default(true);
            $table->boolean('tree_url_is_editable')->default(true);
            $table->boolean('tree_menu_is_visible')->default(true);
            $table->string('tree_alias', 32)->default('');
            $table->string('tree_class')->default('');
            $table->string('tree_object_type')->default('');
            $table->string('tree_description')->default('');
            $table->boolean('tree_is_published')->default(true);
            $table->dateTime('tree_published_from')->nullable()->default(null);
            $table->dateTime('tree_published_to')->nullable()->default(null);
            $table->unsignedBigInteger('user_id')->unsigned()->default(0);
            $table->unsignedBigInteger('copy_of_id')->unsigned()->default(null)->nullable();
            $table->timestamps();
            $table->nestedSet();

            $table->index(['category_id', 'document_id', 'link_id']);
            $table->index('copy_of_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tree');
    }
}
