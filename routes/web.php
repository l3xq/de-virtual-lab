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
    ])->middleware('jwt.auth');

    Route::post('/exams', [
        'uses' => 'ExamController@createNewExam',
        'as' => 'exams.createNewExam'
    ])->middleware('jwt.auth');

    Route::put('/exams/{id}', [
        'uses' => 'ExamController@updateExamById',
        'as' => 'exams.updateExamById'
    ])->middleware('jwt.auth');

    Route::delete('/lessons/{id}', [
        'uses' => 'ExamController@deleteLessonsByExamAndId',
        'as' => 'exams.deleteLessons'
    ])->middleware('jwt.auth');

    Route::delete('/periods/{id}', [
        'uses' => 'ExamController@deletePeriodById',
        'as' => 'exams.deletePeriod'
    ])->middleware('jwt.auth');

    Route::get('/lessons/{id}', [
        'uses' => 'ExamController@getLessonById',
        'as' => 'exams.getLesson'
    ]);

    Route::get('/lessons/{id}/file', [
        'uses' => 'ExamController@getFullLessonInfoById',
        'as' => 'exams.getFullLessonInfo'
    ]);

    Route::get('/periods/{id}', [
        'uses' => 'ExamController@getPeriodById',
        'as' => 'exams.getPeriod'
    ]);

    Route::get('/periods/{id}/file', [
        'uses' => 'ExamController@getFullPeriodInfoById',
        'as' => 'exams.getFullPeriodInfoById'
    ]);

    Route::get('/students/{id}', [
        'uses' => 'ExamController@getStudentById',
        'as' => 'exams.getStudent'
    ]);

    Route::put('/lessons/{id}', [
        'uses' => 'ExamController@updateLessonById',
        'as' => 'exams.updateLessonById'
    ])->middleware('jwt.auth');

    Route::post('/lessons', [
        'uses' => 'ExamController@createNewLesson',
        'as' => 'exams.createNewLesson'
    ])->middleware('jwt.auth');

    Route::put('/students/{id}', [
        'uses' => 'ExamController@updateStudentById',
        'as' => 'exams.updateStudent'
    ])->middleware('jwt.auth');

    Route::post('/students', [
        'uses' => 'ExamController@createNewStudent',
        'as' => 'exams.createNewStudent'
    ])->middleware('jwt.auth');

    Route::put('/periods/{id}', [
        'uses' => 'ExamController@updatePeriodById',
        'as' => 'exams.updatePeriod'
    ])->middleware('jwt.auth');

    Route::post('/periods', [
        'uses' => 'ExamController@createNewPeriod',
        'as' => 'exams.createNewPeriod'
    ])->middleware('jwt.auth');

    Route::delete('/students/{id}', [
        'uses' => 'ExamController@deleteStudentById',
        'as' => 'exams.deleteStudentById'
    ])->middleware('jwt.auth');

    // Exam routes END
    /************************************************************************/
    // Lab routes START

    Route::get('/labs', [
        'uses' => 'LabController@getLabs',
        'as' => 'labs.getLabs'
    ]);

    Route::get('/labs/{id}', [
        'uses' => 'LabController@getLabById',
        'as' => 'labs.getLabById'
    ]);

    Route::put('/labs/{id}', [
        'uses' => 'LabController@updateLabById',
        'as' => 'labs.updateLab'
    ])->middleware('jwt.auth');

    Route::post('/labs', [
        'uses' => 'LabController@createNewLab',
        'as' => 'labs.createLab'
    ])->middleware('jwt.auth');

    Route::delete('/labs/{id}', [
        'uses' => 'LabController@deleteLabById',
        'as' => 'labs.deleteLab'
    ])->middleware('jwt.auth');

    // Lab routes END
    /************************************************************************/
    // Notifications routes START

    Route::get('/notifications', [
        'uses' => 'NotificationController@getNotifications',
        'as' => 'notifications.getNotifications'
    ]);

    Route::get('/notifications/{id}', [
        'uses' => 'NotificationController@getNotificationById',
        'as' => 'notifications.getNotification'
    ]);

    Route::put('/notifications/{id}', [
        'uses' => 'NotificationController@updateNotificationById',
        'as' => 'notifications.updateNotification'
    ])->middleware('jwt.auth');

    Route::post('/notifications', [
        'uses' => 'NotificationController@createNewNotification',
        'as' => 'notifications.createNotification'
    ])->middleware('jwt.auth');

    Route::delete('/notifications/{id}', [
        'uses' => 'NotificationController@deleteNotificationById',
        'as' => 'notifications.deleteNotification'
    ])->middleware('jwt.auth');

    // Notifications routes END
    /************************************************************************/
    // Credentials & Authorization routes

    Route::resource('authenticate', 'AuthenticateController');
    Route::post('authenticate', 'AuthenticateController@authenticate');
});
