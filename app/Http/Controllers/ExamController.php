<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Exam;
use App\Period;
use App\Student;
use App\Lesson;
use Illuminate\Http\Response as Response;
use Illuminate\Support\Facades\Log;

class ExamController extends Controller
{
    public function getExams(Request $request)
    {
        try {
            $exams = Exam::all()->toArray();

            return response()->json(['status' => 200, 'data' => $exams]);
        } catch (Exception $e) {
            Log::error( $e->getMessage() );
            continue;
        }
    }

    public function getExamById(Request $request, $id)
    {
        try {
            $examById = Exam::where('id', $id)->get()->toArray();

            return response()->json(['status' => 200, 'data' => $examById]);
        } catch (Exception $e) {
            Log::error( $e->getMessage() );
            continue;
        }
    }

    public function getPeriodsByExamId(Request $request, $id)
    {
        try {
            $periodsByExamId = Period::where('exam_id', $id)->get()->toArray();

            return response()->json(['status' => 200, 'data' => $periodsByExamId]);
        } catch (Exception $e) {
            Log::error( $e->getMessage() );
            continue;
        }
    }

    public function getStudentsByExamAndPeriod(Request $request, $id, $pid)
    {
        try {
            $studentsByExamAndPeriod = Student::where([
                'exam_id' => $id,
                'period_id' => $pid,
                ])->get()->toArray();
    
            return response()->json(['status' => 200, 'data' => $studentsByExamAndPeriod]);
        } catch (Exception $e) {
            Log::error( $e->getMessage() );
            continue;
        }
    }

    public function getLessonsByExamId(Request $request, $id)
    {
        try {
            $lessonsByExamId = Lesson::where([
                'exam_id' => $id,
                ])->get()->toArray();
    
            return response()->json(['status' => 200, 'data' => $lessonsByExamId]);
        } catch (Exception $e) {
            Log::error( $e->getMessage() );
            continue;
        }
    }

    public function deleteExamById(Request $request, $id)
    {
        try {
            $deleteExamById = Exam::where('id', $id)->delete();

            return response()->json(['status' => 200, 'data' => 'Exam by ID[' . $id . '] has been deleted!']);
        } catch (Exception $e) {
            Log::error( $e->getMessage() );
            continue;
        }
    }

    public function createNewExam(Request $request)
    {
        try {
            $exam = new Exam;

            $exam->title = $request['title'];

            $exam->save();

            return response()->json(['status' => 200, 'data' => 'New exam has been created.']);
        } catch (Exception $e) {
            Log::error( $e->getMessage() );
            continue;
        }
    }

    public function updateExamById(Request $request, $id)
    {
        try {
            $exam = Exam::find($id);

            $exam->title = $request['title'];

            $exam->save();

            return response()->json(['status' => 200, 'data' => 'Exam has been updated.']);
        } catch (Exception $e) {
            Log::error( $e->getMessage() );
            continue;
        }
    }

    public function deleteLessonsByExamAndId(Request $request, $id)
    {
        try {
            $deleteLessonById = Lesson::where('id', $id)->delete();

            return response()->json(['status' => 200, 'data' => 'Lesson with exam ID[' . $id . '] has been deleted!']);
        } catch (Exception $e) {
            Log::error( $e->getMessage() );
            continue;
        }
    }

    public function deletePeriodById(Request $request, $id)
    {
        try {
            $deleteLessonById = Period::where('id', $id)->delete();

            return response()->json(['status' => 200, 'data' => 'Period by ID[' . $id . '] has been deleted!']);
        } catch (Exception $e) {
            Log::error( $e->getMessage() );
            continue;
        }
    }

    public function getLessonById(Request $request, $id)
    {
        try {
            $getLesson = Lesson::where('id', $id)->get();

            return response()->json(['status' => 200, 'data' => $getLesson]);
        } catch (Exception $e) {
            Log::error( $e->getMessage() );
            continue;
        }
    }

    public function getPeriodById(Request $request, $id)
    {
        try {
            $getPeriod = Period::where('id', $id)->get();

            return response()->json(['status' => 200, 'data' => $getPeriod]);
        } catch (Exception $e) {
            Log::error( $e->getMessage() );
            continue;
        }
    }

    public function getStudentById(Request $request, $id)
    {
        try {
            $getStudent = Student::where('id', $id)->get();

            return response()->json(['status' => 200, 'data' => $getStudent]);
        } catch (Exception $e) {
            Log::error( $e->getMessage() );
            continue;
        }
    }

    public function updateLessonById(Request $request, $id)
    {
        try {
            $lesson = Lesson::find($id);

            $lesson->title = $request['title'];
            $lesson->path = $request['path'];

            $lesson->save();

            return response()->json(['status' => 200, 'data' => 'Lesson has been updated.']);
        } catch (Exception $e) {
            Log::error( $e->getMessage() );
            continue;
        }
    }

    public function createNewLesson(Request $request)
    {
        try {
            $lesson = new Lesson;

            $lesson->title = $request['title'];
            $lesson->path = $request['path'];
            $lesson->exam_id = $request['exam_id'];

            $lesson->save();

            return response()->json(['status' => 200, 'data' => 'New Lesson has been created.']);
        } catch (Exception $e) {
            Log::error( $e->getMessage() );
            continue;
        }
    }

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
            Log::error( $e->getMessage() );
            continue;
        }
    }

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
            Log::error( $e->getMessage() );
            continue;
        }
    }

    public function updatePeriodById(Request $request, $id)
    {
        try {
            $period = Period::find($id);

            $period->name = $request['name'];

            $period->save();

        return response()->json(['status' => 200, 'data' => 'Period by ID[' . $id . '] has been updated.']);
        } catch (Exception $e) {
            Log::error( $e->getMessage() );
            continue;
        }
    }

    public function createNewPeriod(Request $request)
    {
        try {
            $period = new Period;

            $period->name = $request['name'];
            $period->exam_id = $request['exam_id'];

            $period->save();

            return response()->json(['status' => 200, 'data' => 'Period has been created.']);
        } catch (Exception $e) {
            Log::error( $e->getMessage() );
            continue;
        }
    }

    public function deleteStudentById(Request $request, $id)
    {
        try {
            $deleteStudentById = Student::where('id', $id)->delete();

            return response()->json(['status' => 200, 'data' => 'Student by ID[' . $id . '] has been deleted!']);
        } catch (Exception $e) {
            Log::error( $e->getMessage() );
            continue;
        }
    }
}
