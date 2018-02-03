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
            $table->increments('id');
            $table->string('title', 50);
            $table->string('path', 250);
            $table->timestamps();

            $table->unsignedInteger('exam_id');
        });
        /*
                Schema::table('lessons', function (Blueprint $table) {
                    $sqlFirst = 'ALTER TABLE `lessons`
                        ADD KEY `exam_id` (`exam_id`);';
                    $sqlSecond = 'ALTER TABLE `lessons`
                        ADD CONSTRAINT `lessons_exam_id_foreign` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;';

                    DB::connection()->getPdo()->exec($sqlFirst);
                    DB::connection()->getPdo()->exec($sqlSecond);
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
