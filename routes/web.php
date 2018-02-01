<?php

use App\Exam;

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

Route::group(['prefix' => 'api'], function () {
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

    Route::get('/exams/{id}/students_periodId={pid}', [
        'uses' => 'ExamController@getStudentsByExamAndPeriod',
        'as' => 'exams.studentsByEandP'
    ]);

    Route::get('/exams/{id}/lessons', [
        'uses' => 'ExamController@getLessonsByExamId',
        'as' => 'exams.getLessonsByExamId'
    ]);

    Route::delete('/exams/{id}', [
        'uses' => 'ExamController@deleteExamById',
        'as' => 'exams.deleteExamById'
    ]);
    
    // TODO: When creating exam, you are creating it based on which params?
    Route::put('/exams', [
        'uses' => 'ExamController@createNewExam',
        'as' => 'exams.createNewExam'
    ]);






    // Exam routes END
});
