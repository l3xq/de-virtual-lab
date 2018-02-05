<?php

namespace App\Http\Controllers;

use App\Credentials;
use Illuminate\Http\Request;

class CredentialsController extends Controller
{
    public function getCredentials(Request $request)
    {
        $getCredentials = Credentials::all()->toArray();

        return response()->json(['status' => 200, 'data' => $getCredentials]);
    }
}
