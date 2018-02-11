<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Lab;
use Exception;

class LabController extends Controller
{
    public function getLabs(Request $request)
    {
        try {
            $getLabs = Lab::all()->toArray();

            return response()->json(['status' => 200, 'data' => $getLabs]);
        } catch (Exception $e) {
            // Log errors
            Log::error($e->getMessage());
            return false;
        }
    }

    public function getLabById(Request $request, $id)
    {
        try {
            $labById = Lab::where('id', $id)->get()->toArray();

            return response()->json(['status' => 200, 'data' => $labById]);
        } catch (Exception $e) {
            // Log errors
            Log::error($e->getMessage());
            return false;
        }
    }


    public function updateLabById(Request $request, $id)
    {
        try {
            $lab = Lab::find($id);

            $lab->title = $request['title'];
            $lab->link = $request['link'];

            $lab->save();

            return response()->json(['status' => 200, 'data' => 'Lab has been updated.']);
        } catch (Exception $e) {
            // Log errors
            Log::error($e->getMessage());
            return false;
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
            // Log errors
            Log::error($e->getMessage());
            return false;
        }
    }

    public function deleteLabById(Request $request, $id)
    {
        try {
            $lab = Lab::find('id');

            $lab->delete();

            return response()->json(['status' => 200, 'data' => 'Lab by ID[' . $id . '] has been deleted!']);
        } catch (Exception $e) {
            // Log errors
            Log::error($e->getMessage());
            return false;
        }
    }
}
