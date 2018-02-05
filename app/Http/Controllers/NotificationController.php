<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response as Response;
use App\Notification;

class NotificationController extends Controller
{
    public function getNotifications(Request $request)
    {
        $getNotifications = Notification::all()->toArray();

        return response()->json(['status' => 200, 'data' => $getNotifications]);
    }

    public function getNotificationById(Request $request, $id)
    {
        $getNotification = Notification::where('id', $id)->get();

        return response()->json(['status' => 200, 'data' => $getNotification]);
    }

    public function updateNotificationById(Request $request, $id)
    {
        $notification = Notification::find($id);

        $notification->title = $request['title'];
        $notification->text = $request['text'];
        $notification->time = $request['time'];

        $notification->save();

        return response()->json(['status' => 200, 'data' => 'Notification has been updated.']);
    }

    public function createNewNotification(Request $request)
    {
        $notification = new Notification;

        $notification->title = $request['title'];
        $notification->text = $request['text'];
        $notification->time = $request['time'];

        $notification->save();

        return response()->json(['status' => 200, 'data' => 'New Notification has been created.']);
    }

    public function deleteNotificationById(Request $request, $id)
    {
        $deleteNotification = Notification::where('id', $id)->delete();

        return response()->json(['status' => 200, 'data' => 'Notification by ID[' . $id . '] has been deleted!']);
    }
}
