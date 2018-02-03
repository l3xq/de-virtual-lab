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
            $table->increments('id');
            $table->string('name', 50);
            $table->timestamps();

            $table->unsignedInteger('exam_id');
        });

        /*Schema::table('periods', function (Blueprint $table) {
            $sqlFirst = 'ALTER TABLE `periods`
                ADD KEY `exam_id` (`exam_id`);';
            $sqlSecond = 'ALTER TABLE `periods`
                ADD CONSTRAINT `periods_exam_id_foreign` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;';

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
        Schema::dropIfExists('periods');
    }
}
