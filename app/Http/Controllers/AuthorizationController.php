<?php

namespace App\Http\Controllers;

use App\Authorization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AuthorizationController extends Controller
{

    public function getToken(Request $request)
    {
        try {
            $getToken = Authorization::all()->toArray();

            return response()->json(['status' => 200, 'data' => $getToken]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            continue;
        }
    }

    public function updateToken(Request $request)
    {
        try {
            $authorization = Authorization::all()->first();

            $authorization->token_id = $request['token'];

            $authorization->save();

            return response()->json(['status' => 200, 'data' => 'TOKEN has been updated.']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            continue;
        }
    }
}
