<?php

namespace App\Http\Controllers;

use App\Http\Resources\RowResource;
use App\Models\Row;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RowsController extends Controller
{
    // Create new Row
    function create(Request $request)
    {
        $request->validate([
            'title' => ['required', 'string'],
            'position' => ['required', 'integer'],
        ]);

        $row = new Row([
            'title' => $request->title,
            'position' => $request->position,
            'user_id' => $request->user()->id
        ]);
        $row->save();

        return response()->json(['status' => !empty($row)], 201);
    }

    // Fetch all user Rows and associated tasks
    function index(Request $request): Response
    {
        $user = $request->user();
        $rows = [];

        $userResources = RowResource::collection(
            Row::where('user_id', $user->id)
                ->get()
        );

        $rows = $userResources->toArray($request);

        return response($rows, 200);
    }
}
