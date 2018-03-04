<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use App\Exam;
use App\Period;
use App\Student;
use App\Lesson;
use Illuminate\Http\Response as Response;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ExamController extends Controller
{


    public function gitWebHook(Request $request){
            # Sometype of CD is working
            #$req_dump = print_r($request, true);
            #$fp = file_put_contents('request.json', $req_dump);
            $fp2 = file_put_contents('reqALL.json', json_encode($request, true));
            
            exec('git pull');
            
            return response(200);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getExams(Request $request)
    {
        try {
            $exams = Exam::all()->toArray();

            return response()->json(['status' => 200, 'data' => $exams]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getExamById(Request $request, $id)
    {
        try {
            $examById = Exam::where('id', $id)->get()->toArray();

            return response()->json(['status' => 200, 'data' => $examById]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPeriodsByExamId(Request $request, $id)
    {
        try {
            $periodsByExamId = Period::where('exam_id', $id)->get()->toArray();

            $periodTempArray = [];
            $periodsStriped = [];

            foreach ($periodsByExamId as $period) {
                $periodTempArray['id'] = $period['id'];
                $periodTempArray['exam_id'] = $period['exam_id'];
                $periodTempArray['title'] = $period['title'];
                $periodTempArray['name'] = $period['name'];

                array_push($periodsStriped, $periodTempArray);
            }

            return response()->json(['status' => 200, 'data' => $periodsStriped]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @param $pid
     * @return \Illuminate\Http\JsonResponse
     */
    public function getStudentsByExamAndPeriod(Request $request, $id, $pid)
    {
        try {
            $studentsByExamAndPeriod = Student::where([
                'exam_id' => $id,
                'period_id' => $pid,
            ])->get()->toArray();

            return response()->json(['status' => 200, 'data' => $studentsByExamAndPeriod]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLessonsByExamId(Request $request, $id)
    {
        try {
            $lessonsByExamId = Lesson::where([
                'exam_id' => $id,
            ])->get()->toArray();

            $lessonTempArray = [];
            $lessonsStriped = [];

            foreach ($lessonsByExamId as $lesson) {
                $lessonTempArray['id'] = $lesson['id'];
                $lessonTempArray['exam_id'] = $lesson['exam_id'];
                $lessonTempArray['title'] = $lesson['title'];
                $lessonTempArray['name'] = $lesson['name'];

                array_push($lessonsStriped, $lessonTempArray);
            }

            return response()->json(['status' => 200, 'data' => $lessonsStriped]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteExamById(Request $request, $id)
    {
        try {
            $exam = Exam::find($id);

            $exam->delete();

            return response()->json(['status' => 200, 'data' => 'Exam by ID[' . $id . '] has been deleted!']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createNewExam(Request $request)
    {
        try {
            $exam = new Exam;

            $exam->title = $request['title'];

            $exam->save();

            return response()->json(['status' => 200, 'data' => 'New exam has been created.']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateExamById(Request $request, $id)
    {
        try {
            $exam = Exam::find($id);

            $exam->title = $request['title'];

            $exam->save();

            return response()->json(['status' => 200, 'data' => 'Exam has been updated.']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteLessonsByExamAndId(Request $request, $id)
    {
        try {
            $lesson = Lesson::find($id);

            $lesson->delete();

            return response()->json(['status' => 200, 'data' => 'Lesson with ID[' . $id . '] has been deleted!']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deletePeriodById(Request $request, $id)
    {
        try {
            $period = Period::find($id);

            $period->delete();

            return response()->json(['status' => 200, 'data' => 'Period by ID[' . $id . '] has been deleted!']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLessonById(Request $request, $id)
    {
        try {
            $getLesson = Lesson::where('id', $id)->get()->toArray();

            // This was done because of the previous migration when double IDs were possible
            $tmp = reset($getLesson);

            $lessonTempArray = [];

            $lessonTempArray['id'] = $tmp['id'];
            $lessonTempArray['exam_id'] = $tmp['exam_id'];
            $lessonTempArray['title'] = $tmp['title'];
            $lessonTempArray['name'] = $tmp['name'];

            return response()->json(['status' => 200, 'data' => $lessonTempArray]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getFullLessonInfoById(Request $request, $id)
    {
        try {
            $getLesson = Lesson::where('id', $id)->get();

            return response()->json(['status' => 200, 'data' => $getLesson]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPeriodById(Request $request, $id)
    {
        try {
            $getPeriod = Period::where('id', $id)->get()->toArray();

            // TODO: Change approach to limit possible double IDs

            // This was done because of the previous migration when double IDs were possible
            $tmp = reset($getPeriod);

            $periodTempArray = [];

            $periodTempArray['id'] = $tmp['id'];
            $periodTempArray['exam_id'] = $tmp['exam_id'];
            $periodTempArray['title'] = $tmp['title'];
            $periodTempArray['name'] = $tmp['name'];

            return response()->json(['status' => 200, 'data' => $periodTempArray]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getFullPeriodInfoById(Request $request, $id)
    {
        try {
            $getPeriod = Period::where('id', $id)->get();

            return response()->json(['status' => 200, 'data' => $getPeriod]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getStudentById(Request $request, $id)
    {
        try {
            $getStudent = Student::where('id', $id)->get();

            return response()->json(['status' => 200, 'data' => $getStudent]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateLessonById(Request $request, $id)
    {
        try {
            $lesson = Lesson::find($id);

            $lesson->title = $request['title'];
            $lesson->exam_id = $request['exam_id'];
            $lesson->name = $request['name'];
            $lesson->file = $request['file'];
            $lesson->mime = $request['mime'];
            $lesson->size = $request['size'];

            $lesson->save();

            return response()->json(['status' => 200, 'data' => 'Lesson has been updated.']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createNewLesson(Request $request)
    {
        try {
            $lesson = new Lesson;

            $lesson->title = $request['title'];
            $lesson->exam_id = $request['exam_id'];
            $lesson->name = $request['name'];
            $lesson->file = $request['file'];
            $lesson->mime = $request['mime'];
            $lesson->size = $request['size'];

            $lesson->save();

            return response()->json(['status' => 200, 'data' => 'Lesson has been created.']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateStudentById(Request $request, $id)
    {
        try {
            $student = Student::find($id);

            $student->firstName = $request['firstName'];
            $student->lastName = $request['lastName'];
            $student->index = $request['index'];
            $student->mark = $request['mark'];
            $student->unit = $request['unit'];

            $student->save();

            return response()->json(['status' => 200, 'data' => 'Student by ID[' . $id . '] has been updated.']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createNewStudent(Request $request)
    {
        try {
            $student = new Student;

            $student->firstName = $request['firstName'];
            $student->lastName = $request['lastName'];
            $student->index = $request['index'];
            $student->mark = $request['mark'];
            $student->unit = $request['unit'];

            $student->exam_id = $request['exam_id'];
            $student->period_id = $request['period_id'];

            $student->save();

            return response()->json(['status' => 200, 'data' => 'Student has been created.']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updatePeriodById(Request $request, $id)
    {
        try {
            $period = Period::find($id);

            $period->title = $request['title'];

            if ($request['size'] !== 0) {
                $period->name = $request['name'];
                $period->file = $request['file'];
                $period->mime = $request['mime'];
                $period->size = $request['size'];
            } else {
                $period->name = '';
                $period->file = '';
                $period->mime = '';
                $period->size = 0;
            }

            $period->save();

            return response()->json(['status' => 200, 'data' => 'Period by ID[' . $id . '] has been updated.']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createNewPeriod(Request $request)
    {
        try {
            $period = new Period;

            $period->title = $request['title'];
            $period->exam_id = $request['exam_id'];

            if ($request['size'] !== 0) {
                $period->name = $request['name'];
                $period->file = $request['file'];
                $period->mime = $request['mime'];
                $period->size = $request['size'];
            } else {
                $period->name = '';
                $period->file = '';
                $period->mime = '';
                $period->size = 0;
            }

            $period->save();

            return response()->json(['status' => 200, 'data' => 'Period has been created.']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteStudentById(Request $request, $id)
    {
        try {
            $student = Student::find($id);

            $student->delete();

            return response()->json(['status' => 200, 'data' => 'Student by ID[' . $id . '] has been deleted!']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }
}
