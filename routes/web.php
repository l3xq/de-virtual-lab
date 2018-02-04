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

    /************************************************************************/
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

    Route::post('/exams', [
        'uses' => 'ExamController@createNewExam',
        'as' => 'exams.createNewExam'
    ]);

    Route::put('/exams/{id}', [
        'uses' => 'ExamController@updateExamById',
        'as' => 'exams.updateExamById'
    ]);

    Route::delete('/lessons/{id}', [
        'uses' => 'ExamController@deleteLessonsByExamAndId',
        'as' => 'exams.deleteLessons'
    ]);

    Route::delete('/periods/{id}', [
        'uses' => 'ExamController@deletePeriodById',
        'as' => 'exams.deletePeriod'
    ]);

    Route::get('/lessons/{id}', [
        'uses' => 'ExamController@getLessonById',
        'as' => 'exams.getLesson'
    ]);

    Route::get('/periods/{id}', [
        'uses' => 'ExamController@getPeriodById',
        'as' => 'exams.getPeriod'
    ]);

    Route::get('/students/{id}', [
        'uses' => 'ExamController@getStudentById',
        'as' => 'exams.getStudent'
    ]);

    Route::put('/lessons/{id}', [
        'uses' => 'ExamController@updateLessonById',
        'as' => 'exams.updateLesson'
    ]);

    Route::post('/lessons', [
        'uses' => 'ExamController@createNewLesson',
        'as' => 'exams.createNewLesson'
    ]);

    Route::put('/students/{id}', [
        'uses' => 'ExamController@updateStudentById',
        'as' => 'exams.updateStudent'
    ]);

    Route::post('/students', [
        'uses' => 'ExamController@createNewStudent',
        'as' => 'exams.createNewStudent'
    ]);

    Route::put('/periods/{id}', [
        'uses' => 'ExamController@updatePeriodById',
        'as' => 'exams.updatePeriod'
    ]);

    Route::post('/periods', [
        'uses' => 'ExamController@createNewPeriod',
        'as' => 'exams.createNewPeriod'
    ]);

    Route::delete('/students/{id}', [
        'uses' => 'ExamController@deleteStudentById',
        'as' => 'exams.deleteStudentById'
    ]);

    // Exam routes END
    /************************************************************************/
    // Lab routes START

    Route::get('/labs', [
        'uses' => 'LabController@getLabs',
        'as' => 'exams.getLabs'
    ]);

    // Lab routes END
    /************************************************************************/
    // Notifications routes START

    Route::get('/notifications', [
        'uses' => 'NotificationController@getNotifications',
        'as' => 'exams.getNotifications'
    ]);

    Route::get('/notifications/{id}', [
        'uses' => 'NotificationController@getNotificationById',
        'as' => 'exams.getNotification'
    ]);

    Route::put('/notifications/{id}', [
        'uses' => 'NotificationController@updateNotificationById',
        'as' => 'exams.updateNotification'
    ]);

    Route::post('/notifications', [
        'uses' => 'NotificationController@createNewNotification',
        'as' => 'exams.createNotification'
    ]);

    Route::delete('/notifications/{id}', [
        'uses' => 'NotificationController@deleteNotificationById',
        'as' => 'exams.deleteNotification'
    ]);

    // Notifications routes END
    /************************************************************************/
    // Credentials & Authorization routes START

    Route::put('/authorization', [
        'uses' => 'AuthorizationController@updateToken',
        'as' => 'exams.updateToken'
    ]);

    Route::get('/authorization', [
        'uses' => 'AuthorizationController@getToken',
        'as' => 'exams.getToken'
    ]);

    Route::get('/credentials', [
        'uses' => 'CredentialsController@getCredentials',
        'as' => 'exams.getCredentials'
    ]);

    // Credentials & Authorization routes END
});
