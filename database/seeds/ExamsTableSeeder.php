<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Exam as Exam;

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
            $exam = new Exam;
            $exam->title = $faker->word;
            
            $exam->save();
        }
    }
}
