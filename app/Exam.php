<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    public function getAllExams()
    {
        return Exam::all();
    }
}
