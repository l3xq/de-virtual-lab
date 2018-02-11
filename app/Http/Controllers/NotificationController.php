<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response as Response;
use App\Notification;
use Exception;

class NotificationController extends Controller
{
    public function getNotifications(Request $request)
    {
        try {
            $getNotifications = Notification::all()->toArray();

            return response()->json(['status' => 200, 'data' => $getNotifications]);
        } catch (Exception $e) {
            // Log errors
            Log::error($e->getMessage());
            return false;
        }
    }

    public function getNotificationById(Request $request, $id)
    {
        try {
            $getNotification = Notification::where('id', $id)->get();

            return response()->json(['status' => 200, 'data' => $getNotification]);
        } catch (Exception $e) {
            // Log errors
            Log::error($e->getMessage());
            return false;
        }
    }

    public function updateNotificationById(Request $request, $id)
    {
        try {
            $notification = Notification::find($id);

            $notification->title = $request['title'];
            $notification->text = $request['text'];
            $notification->time = $request['time'];

            $notification->save();

            return response()->json(['status' => 200, 'data' => 'Notification has been updated.']);
        } catch (Exception $e) {
            // Log errors
            Log::error($e->getMessage());
            return false;
        }
    }

    public function createNewNotification(Request $request)
    {
        try {
            $notification = new Notification;

            $notification->title = $request['title'];
            $notification->text = $request['text'];
            $notification->time = $request['time'];

            $notification->save();

            return response()->json(['status' => 200, 'data' => 'New Notification has been created.']);
        } catch (Exception $e) {
            // Log errors
            Log::error($e->getMessage());
            return false;
        }
    }

    public function deleteNotificationById(Request $request, $id)
    {
        try {
            $notification = Notification::find($id);

            $notification->delete();

            return response()->json(['status' => 200, 'data' => 'Notification by ID[' . $id . '] has been deleted!']);
        } catch (Exception $e) {
            // Log errors
            Log::error($e->getMessage());
            return false;
        }
    }
}
