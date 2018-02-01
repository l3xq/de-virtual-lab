<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Exam;
use App\Period;
use App\Student;
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

    public function updateExamById(Request $request, $id, Object $object)
    {
        dd($request);
        return response()->json(['status' => 200, 'data' => 'New exam has been created.']);
    }
}
