<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Row;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\TaskResource;
use Illuminate\Database\Eloquent\Collection;

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

        $newPositition = Row::find($request->row_id)->getNextPositionId();

        $task = new Task([
            'title' => $request->title,
            'user_id' => $request->user()->id,
            'description' => $request->description,
            'start_time' => $request->start_at,
            'end_time' => $request->end_at,
            'row_id' => $request->row_id,
            'priority_id' => $request->priority_id,
            'is_closed' => false,
            'elapsed_time' => 0,
            'position' => $newPositition
        ]);

        $task->save();

        return response()->json(['status' => !empty($task)], 201);
    }

    // Display single task
    function show(Task $task, Request $request)
    {
        $taskInfo = (new TaskResource($task))->toArray($request);

        return Inertia::render('Task', [
            'data' => $taskInfo,
            'title' => $taskInfo['title'],
        ]);
    }

    // Update a task 
    function update(Task $task, Request $request)
    {
        $request->validate([
            'time' => ['required', 'integer']
        ]);

        $task->update([
            'elapsed_time' => $request->time
        ]);

        $task->save();

        return response()->json(['status' => true], 201);
    }

    // Edit a task
    function edit(Task $task, Request $request)
    {
        $argumentList = [];

        if ($request->has('is_closed')) {
            $argumentList = [
                'is_closed' => $request->is_closed,
                'closed_at' => $request->is_closed === true ? now() : null
            ];
        }

        if ($request->has('destination')) {
            $argumentList = [
                'position' => $request->destination,
            ];

            $sourceTask = $task->row()->getResults()->getTaskByPosition($request->destination);

            $sourceTask->updateOrFail([
                'position' => $task->position,
            ]);

            $sourceTask->save();
        }
        $task->updateOrFail($argumentList);

        $task->save();
        dd($task);

        return response()->json(['status' => true, 'task' => $task], 201);
    }
}
