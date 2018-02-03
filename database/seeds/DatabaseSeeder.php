<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(ExamsTableSeeder::class);
        $this->call(LabsTableSeeder::class);
        $this->call(LessonsTableSeeder::class);
        $this->call(NotificationsTableSeeder::class);
        $this->call(PeriodsTableSeeder::class);
        $this->call(StudentsTableSeeder::class);
    }
}
