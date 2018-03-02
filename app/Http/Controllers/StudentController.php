<?php

namespace App\Http\Controllers;

use App\Student;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class StudentController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  \App\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function show(Student $student)
    {
        $students = json_encode(Student::all()->toArray());

        return Response::json(['status' => 200, 'getAllStudents' => $students]);
    }
}
