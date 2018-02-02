<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Exam;
use App\Period;
use App\Student;
use App\Lesson;
use Illuminate\Http\Response as Response;

class ExamController extends Controller
{
    public function getExams(Request $request)
    {
        //$exams = json_encode(Exam::all()->toArray());

        $exams = Exam::all()->toArray();
        return response()->json(['status' => 200, 'data' => $exams]);
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
        $deleteExamById = Exam::where('exam_id', $id)->delete();
        return response()->json(['status' => 200, 'data' => 'Exam by ID[' . $id . '] has been deleted!']);
    }

    public function createNewExam(Request $request)
    {
        $exam = new Exam;
        $exam->save();

        return response()->json(['status' => 200, 'data' => 'New exam has been created.']);
    }

    public function updateExamById(Request $request, $id, Exam $examObject)
    {
        // TODO: Marko should debug his side
        // Exam can be found, but there is nothing in POST being passed as an object.
        $exam = Exam::find($id);
        //$examObjectDecoded = json_decode($examObject);
        //$obj = $_POST['data'];

        // To check the outcome of this, got to updateExamById in Postman, chose Preview and check the outcome
        echo 'POST METHOD =>';
        var_dump($_POST);

        echo 'EXAM OBJECT FOUND BY ID =>';
        dd($exam);

        $exam->title = $examObjectDecoded['title'];

        $exam->save();
        return response()->json(['status' => 200, 'data' => 'Exam title has been updated.']);
    }

    public function deleteLessonsByExamAndId(Request $request, $id)
    {
        // TODO: Marko -> Check if your logic is correct for that naming convention
        $deleteLessonById = Lesson::where('exam_id', $id)->delete();
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

    public function updateLessonById(Request $request, $id, Lesson $lessonObject)
    {
        // TODO: Marko -> same issue as updateExamById
        $lesson = Lesson::find($id);

        echo 'POST METHOD =>';
        var_dump($_POST);

        echo 'LESSON OBJECT FOUND BY ID =>';
        dd($lesson);

        $lessonObjectDecoded = json_decode($lessonObject);

        $lesson->title = $lessonObjectDecoded['title'];
        $lesson->path = $lessonObjectDecoded['path'];

        $lesson->save();
        return response()->json(['status' => 200, 'data' => 'Lesson title&path have been updated.']);
    }
}
