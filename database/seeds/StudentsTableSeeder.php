<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Student as Student;

class StudentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        for ($i = 1; $i < 15; $i++) {
            $student = new Student;
            $student->firstName = $faker->firstName;
            $student->lastName = $faker->lastName;
            $student->index = $faker->numberBetween(1, 999) . '/' . $faker->numberBetween(2010, 2017);
            $student->mark = $faker->randomDigit;
            $student->unit = strtoupper($faker->randomLetter . $faker->randomLetter);

            //NOTE: This is due to FKeys issue
            $student->exam_id = $faker->numberBetween(1, 15);
            $student->period_id = $faker->numberBetween(1, 15);

            $student->save();
        }
    }
}
