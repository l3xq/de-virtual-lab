<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::enableForeignKeyConstraints();

        Schema::create('students', function (Blueprint $table) {
            $table->increments('id', true)->unsigned();
            $table->string('firstName', 50);
            $table->string('lastName', 50);
            $table->string('index', 9);
            $table->float('mark');
            $table->string('unit', 20);
            $table->timestamps();
            $table->integer('exam_id');
            $table->integer('period_id');
        });
/*
        Schema::table('students', function (Blueprint $table) {
            $table->foreign('exam_id')->references('id')->on('exams');
            $table->foreign('period_id')->references('id')->on('periods');
        });*/
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
}
