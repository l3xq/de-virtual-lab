<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response as Response;
use App\Notification;
use Exception;

class NotificationController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getNotifications(Request $request)
    {
        try {
            $getNotifications = Notification::all()->toArray();

            return response()->json(['status' => 200, 'data' => $getNotifications]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getNotificationById(Request $request, $id)
    {
        try {
            $getNotification = Notification::where('id', $id)->get();

            return response()->json(['status' => 200, 'data' => $getNotification]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
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
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
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
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteNotificationById(Request $request, $id)
    {
        try {
            $notification = Notification::find($id);

            $notification->delete();

            return response()->json(['status' => 200, 'data' => 'Notification by ID[' . $id . '] has been deleted!']);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['status' => 400, 'data' => 'Request is invalid or cannot be served.', 'log' => 'Check log for more info!']);
        }
    }
}
