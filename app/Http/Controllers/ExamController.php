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
        $exams = json_encode(Exam::all()->toArray());
        return Response::json(['status' => 200, 'data' => $exams]);
    }

    public function getExamById(Request $request, $id)
    {
        $examById = json_encode(Exam::where('id', $id)->get()->toArray());
        return response()->json(['status' => 200, 'data' => $examById]);
    }
    
    public function getPeriodsByExamId(Request $request, $id)
    {
        $periodsByExamId = json_encode(Period::where('exam_id', $id)->get()->toArray());
        return response()->json(['status' => 200, 'data' => $periodsByExamId]);
    }
    
    public function getStudentsByExamAndPeriod(Request $request, $id, $pid)
    {
        $studentsByExamAndPeriod = json_encode(Student::where([
            'exam_id' => $id,
            'period_id' => $pid,
            ])->get()->toArray());
        return response()->json(['status' => 200, 'data' => $studentsByExamAndPeriod]);
    }
}
