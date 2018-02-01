<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLessonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::enableForeignKeyConstraints();

        Schema::create('lessons', function (Blueprint $table) {
            $table->increments('id', true)->unsigned();
            $table->string('title', 50);
            $table->string('path', 250);
            $table->timestamps();
            $table->integer('exam_id');
        });
/*
        Schema::table('lessons', function (Blueprint $table) {
            $table->foreign('exam_id')->references('id')->on('exams');
        });*/
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lessons');
    }
}
