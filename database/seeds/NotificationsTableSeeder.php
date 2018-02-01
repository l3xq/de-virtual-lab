<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Notification as Notification;

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
            $notification = new Notification;
            $notification->title = $faker->sentence(3,true);
            $notification->text = $faker->paragraph;
            $notification->time = $faker->numberBetween(1517463960,1517493960);
            
            $notification->save();
        }
    }
}
