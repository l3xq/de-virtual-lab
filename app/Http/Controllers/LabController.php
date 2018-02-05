<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Lab;
use Illuminate\Support\Facades\Log;

class LabController extends Controller
{
    public function getLabs(Request $request)
    {
        try {
            $getLabs = Lab::all()->toArray();

            return response()->json(['status' => 200, 'data' => $getLabs]);
        } catch (Exception $e) {
            Log::error( $e->getMessage() );
            continue;
        }
    }
}
