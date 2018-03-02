<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Lab;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Input;

class LabController extends Controller
{
    public function getLabs(Request $request)
    {
        try {
            $getLabs = Lab::all()->toArray();

            return response()->json(['status' => 200, 'data' => $getLabs]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    public function getLabById(Request $request, $id)
    {
        try {
            $labById = Lab::where('id', $id)->get()->toArray();

            return response()->json(['status' => 200, 'data' => $labById]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }


    public function updateLabById(Request $request, $id)
    {
        try {
            $lab = Lab::where('id', $id)->first();

            $lab->title = $request['title'];
            $lab->link = $request['link'];

            $lab->save();

            return response()->json(['status' => 200, 'data' => 'Lab has been updated.']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    public function createNewLab(Request $request)
    {
        try {
            $lab = new Lab();

            $lab->title = $request['title'];
            $lab->link = $request['link'];

            $lab->save();

            return response()->json(['status' => 200, 'data' => 'New Lab has been created.']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    public function deleteLabById(Request $request, $id)
    {
        try {
            $lab = Lab::where('id', $id)->first();

            $lab->delete();

            return response()->json(['status' => 200, 'data' => 'Lab by ID[' . $id . '] has been deleted!']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }
}
