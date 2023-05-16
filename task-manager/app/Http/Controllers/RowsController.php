<?php

namespace App\Http\Controllers;

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

        $userRows = Row::where('user_id', $user->id)
            ->with('tasks')
            ->get()
            ->toArray();

        return response($userRows, 200);
    }
}
