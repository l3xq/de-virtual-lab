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

    public function getLabById(Request $request, $id)
    {
        $labById = Lab::where('id', $id)->get()->toArray();

        return response()->json(['status' => 200, 'data' => $labById]);
    }


    public function updateLabById(Request $request, $id)
    {
        $lab = Lab::find($id);

        $lab->title = $request['title'];
        $lab->link = $request['link'];

        $lab->save();

        return response()->json(['status' => 200, 'data' => 'Lab has been updated.']);
    }

    public function createNewLab(Request $request)
    {
        $lab = new Lab();

        $lab->title = $request['title'];
        $lab->link = $request['link'];

        $lab->save();

        return response()->json(['status' => 200, 'data' => 'New Lab has been created.']);
    }

    public function deleteLabById(Request $request, $id)
    {
        $deleteLabById = Lab::where('id', $id)->delete();

        return response()->json(['status' => 200, 'data' => 'Lab by ID[' . $id . '] has been deleted!']);
    }
}
