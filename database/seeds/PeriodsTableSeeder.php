<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Period as Period;

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
            $period = new Period;
            $period->name = $faker->word . '_' . $faker->word;

            //NOTE: This is due to FKeys issue
            $period->exam_id = 1;

            $period->save();
        }
    }
}
