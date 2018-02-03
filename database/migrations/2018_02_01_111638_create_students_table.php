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
            $table->increments('id');
            $table->string('firstName', 50);
            $table->string('lastName', 50);
            $table->string('index', 9);
            $table->float('mark');
            $table->string('unit', 20);
            $table->timestamps();

            $table->unsignedInteger('exam_id');
            $table->unsignedInteger('period_id');
        });
        /*
                Schema::table('students', function (Blueprint $table) {
                    $sqlFirst = 'ALTER TABLE `students`
                        ADD KEY `exam_id` (`exam_id`),
                        ADD KEY `period_id` (`period_id`);';
                    $sqlSecond = 'ALTER TABLE `students`
                        ADD CONSTRAINT `students_exam_id_foreign` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
                        ADD CONSTRAINT `students_period_id_foreign` FOREIGN KEY (`period_id`) REFERENCES `periods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;';

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
        Schema::dropIfExists('students');
    }
}
