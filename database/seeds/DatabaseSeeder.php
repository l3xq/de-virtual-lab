<?php

use Illuminate\Database\Seeder;
use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        Model::unguard();

        DB::table('users')->delete();

        $users = array(
            ['name' => 'Gosn Admin', 'email' => 'admin@thyself.com', 'password' => Hash::make('secret')],
        );

        foreach ($users as $user)
        {
            User::create($user);
        }

        Model::reguard();
    }
}