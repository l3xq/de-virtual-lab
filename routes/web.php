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

    // Exam routes START
    Route::get('/exams', [
        'uses' => 'ExamController@getExams',
        'as' => 'exams.all'
    ]);

    Route::get('/exams/{id}', [
        'uses' => 'ExamController@getExamById',
        'as' => 'exams.byId'
    ]);

    Route::get('/exams/{id}/periods', [
        'uses' => 'ExamController@getPeriodsByExamId',
        'as' => 'exams.periodsById'
    ]);

    // There was an issue with having ? after passed ID as a param. TODO -> Research how to escape it
    Route::get('/exams/{id}/students_periodId={pid}', [
        'uses' => 'ExamController@getStudentsByExamAndPeriod',
        'as' => 'exams.studentsByEandP'
    ]);
    // Exam routes END
});