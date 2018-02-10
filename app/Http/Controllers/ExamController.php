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
            // Log errors
            Log::error( $e->getMessage() );
            return false;
        }
    }

    public function getExamById(Request $request, $id)
    {
        $examById = Exam::where('id', $id)->get()->toArray();

        return response()->json(['status' => 200, 'data' => $examById]);
    }

    public function getPeriodsByExamId(Request $request, $id)
    {
        $periodsByExamId = Period::where('exam_id', $id)->get()->toArray();

        return response()->json(['status' => 200, 'data' => $periodsByExamId]);
    }

    public function getStudentsByExamAndPeriod(Request $request, $id, $pid)
    {
        $studentsByExamAndPeriod = Student::where([
                'exam_id' => $id,
                'period_id' => $pid,
                ])->get()->toArray();

        return response()->json(['status' => 200, 'data' => $studentsByExamAndPeriod]);
    }

    public function getLessonsByExamId(Request $request, $id)
    {
        $lessonsByExamId = Lesson::where([
                'exam_id' => $id,
                ])->get()->toArray();

        return response()->json(['status' => 200, 'data' => $lessonsByExamId]);
    }

    public function deleteExamById(Request $request, $id)
    {
        $deleteExamById = Exam::where('id', $id)->delete();

        return response()->json(['status' => 200, 'data' => 'Exam by ID[' . $id . '] has been deleted!']);
    }

    public function createNewExam(Request $request)
    {
        $exam = new Exam;

        $exam->title = $request['title'];

        $exam->save();

        return response()->json(['status' => 200, 'data' => 'New exam has been created.']);
    }

    public function updateExamById(Request $request, $id)
    {
        $exam = Exam::find($id);

        $exam->title = $request['title'];

        $exam->save();

        return response()->json(['status' => 200, 'data' => 'Exam has been updated.']);
    }

    public function deleteLessonsByExamAndId(Request $request, $id)
    {
        $deleteLessonById = Lesson::where('id', $id)->delete();

        return response()->json(['status' => 200, 'data' => 'Lesson with exam ID[' . $id . '] has been deleted!']);
    }

    public function deletePeriodById(Request $request, $id)
    {
        $deleteLessonById = Period::where('id', $id)->delete();

        return response()->json(['status' => 200, 'data' => 'Period by ID[' . $id . '] has been deleted!']);
    }

    public function getLessonById(Request $request, $id)
    {
        $getLesson = Lesson::where('id', $id)->get();

        return response()->json(['status' => 200, 'data' => $getLesson]);
    }

    public function getPeriodById(Request $request, $id)
    {
        $getPeriod = Period::where('id', $id)->get();

        return response()->json(['status' => 200, 'data' => $getPeriod]);
    }

    public function getStudentById(Request $request, $id)
    {
        $getStudent = Student::where('id', $id)->get();

        return response()->json(['status' => 200, 'data' => $getStudent]);
    }

    public function updateLessonById(Request $request, $id)
    {
        $lesson = Lesson::find($id);

        $lesson->title = $request['title'];
        $lesson->path = $request['path'];

        $lesson->save();

        return response()->json(['status' => 200, 'data' => 'Lesson has been updated.']);
    }

    public function createNewLesson(Request $request)
    {
        $lesson = new Lesson;

        $lesson->title = $request['title'];
        $lesson->path = $request['path'];
        $lesson->exam_id = $request['exam_id'];

        $lesson->save();

        return response()->json(['status' => 200, 'data' => 'New Lesson has been created.']);
    }

    public function updateStudentById(Request $request, $id)
    {
        $student = Student::find($id);

        $student->firstName = $request['firstName'];
        $student->lastName = $request['lastName'];
        $student->index = $request['index'];
        $student->mark = $request['mark'];
        $student->unit = $request['unit'];

        $student->save();

        return response()->json(['status' => 200, 'data' => 'Student by ID[' . $id . '] has been updated.']);
    }

    public function createNewStudent(Request $request)
    {
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
    }

    public function updatePeriodById(Request $request, $id)
    {
        $period = Period::find($id);

        $period->name = $request['name'];

        $period->save();

        return response()->json(['status' => 200, 'data' => 'Period by ID[' . $id . '] has been updated.']);
    }

    public function createNewPeriod(Request $request)
    {
        $period = new Period;

        $period->name = $request['name'];
        $period->exam_id = $request['exam_id'];

        $period->save();

        return response()->json(['status' => 200, 'data' => 'Period has been created.']);
    }

    public function deleteStudentById(Request $request, $id)
    {
        $deleteStudentById = Student::where('id', $id)->delete();

        return response()->json(['status' => 200, 'data' => 'Student by ID[' . $id . '] has been deleted!']);
    }
}
