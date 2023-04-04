<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->uuid('id');
            $table->unsignedBigInteger('task_id');
            $table->unsignedBigInteger('creator_id');
            $table->unsignedBigInteger('developer_id');
            $table->boolean('active');
            $table->timestamps();

            $table->foreign('task_id')->references('id')->on('task');
            $table->foreign('creator_id')->references('id')->on('users');
            $table->foreign('developer_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
};
