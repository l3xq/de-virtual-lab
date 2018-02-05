<?php

namespace App\Http\Controllers;

use App\Credentials;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CredentialsController extends Controller
{
    public function getCredentials(Request $request)
    {
        try {
            $getCredentials = Credentials::all()->toArray();

            return response()->json(['status' => 200, 'data' => $getCredentials]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            continue;
        }
    }
}
