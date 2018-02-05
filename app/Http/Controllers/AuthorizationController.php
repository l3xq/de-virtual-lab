<?php

namespace App\Http\Controllers;

use App\Authorization;
use Illuminate\Http\Request;

class AuthorizationController extends Controller
{
    public function getToken(Request $request)
    {
        $getToken = Authorization::all()->toArray();

        return response()->json(['status' => 200, 'data' => $getToken]);
    }

    public function updateToken(Request $request)
    {
        $authorization = Authorization::all()->first();

        $authorization->token_id = $request['token'];

        $authorization->save();

        return response()->json(['status' => 200, 'data' => 'TOKEN has been updated.']);
    }
}
