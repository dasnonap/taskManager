<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    // Create Task
    function create(Request $request)
    {
        $request->validate([
            'title' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'start_at' => ['required', 'date_format:Y-m-d'],
            'end_at' => ['required', 'date_format:Y-m-d'],
        ]);

        $task = new Task([
            'title' => $request->title,
            'user_id' => $request->user()->id,
            'description' => $request->description,
            'start_time' => $request->start_at,
            'end_time' => $request->end_at,
            'row_id' => $request->row_id,
            'priority_id' => $request->priority_id,
        ]);

        $task->save();

        return response()->json(['status' => !empty($task)], 201);
    }
}
