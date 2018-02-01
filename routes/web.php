<?php

use App\Exam;
use App\Student;
use Illuminate\Http\Response;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*Route::get('/', [
    //return view('welcome');
    'uses' => 'StudentController@getAllStudents',
        'as' => 'students.all'
]);*/

Route::group(['prefix' => 'api'], function(){
    Route::get('/', [
        'uses' => 'StudentController@show',
        'as' => 'students.all'
    ]);
});