<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Lesson as Lesson;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);

        $faker = Faker::create();
        for ($i=1; $i < 15; $i++) { 
            $lesson = new Lesson;
            $lesson->title = $faker->sentence(3, true);
            $lesson->path = '/path/to/'. $faker->word;

            //NOTE: This is due to FKeys issue
            $lesson->exam_id = 1;

            $lesson->save();
        }
    }
}
