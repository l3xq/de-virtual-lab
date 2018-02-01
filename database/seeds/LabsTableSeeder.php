<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Lab as Lab;

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
            $lab = new Lab;
            $lab->title = $faker->sentence;
            $lab->link = 'http://ftn.kg.ac.rs/' . $faker->word;

            $lab->save();
        }
    }
}
