<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePeriodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::enableForeignKeyConstraints();
        //TODO: Fix issue with FKeys.
        Schema::create('periods', function (Blueprint $table) {
            $table->increments('id', true)->unsigned();
            $table->string('name', 50);
            $table->timestamps();
            $table->integer('exam_id');
        });
        /*Schema::table('periods', function (Blueprint $table) {
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
        Schema::dropIfExists('periods');
    }
}
