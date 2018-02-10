<?php

namespace App\Http\Controllers;

use App\Credentials;
use Illuminate\Http\Request;
use Exception;


class CredentialsController extends Controller
{
    public function getCredentials(Request $request)
    {
        try {
            $getCredentials = Credentials::all()->toArray();

            return response()->json(['status' => 200, 'data' => $getCredentials]);
        } catch (Exception $e) {
            // Log errors
            Log::error($e->getMessage());
            return false;
        }
    }
}
