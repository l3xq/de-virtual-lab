<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Lab;

class LabController extends Controller
{
    public function getLabs(Request $request)
    {
        $getLabs = Lab::all()->toArray();

        return response()->json(['status' => 200, 'data' => $getLabs]);
    }
}
