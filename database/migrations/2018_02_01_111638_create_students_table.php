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
            $table->unsignedInteger('id')->change();
            $table->string('firstName', 50);
            $table->string('lastName', 50);
            $table->string('index', 9);
            $table->float('mark');
            $table->string('unit', 20);
            $table->timestamps();

            $table->increments('id')->change();
        });

        Schema::table('students', function (Blueprint $table) {
            $table->unsignedInteger('exam_id')->default(1);
            $table->unsignedInteger('period_id')->default(1);

            $table->foreign('exam_id')->references('id')->on('exams')->onDelete('cascade');
            $table->foreign('period_id')->references('id')->on('periods')->onDelete('cascade');
        });
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
