<?php

namespace App\Http\Controllers;

use App\Http\Resources\RowResource;
use App\Http\Resources\TaskResource;
use App\Models\Row;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use PO;

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
        $userRows = RowResource::collection(
            Row::where('user_id', $user->id)
                ->get()
        )->toArray($request);

        $userRows = collect($userRows)->groupBy('id');

        $userTasks = TaskResource::collection(
            Task::where('user_id', $user->id)
                ->where('is_closed', false)
                ->with('priority')
                ->get()
        )->toArray($request);

        $rows = collect($userTasks)->groupBy(function ($item) {
            return $item['row'];
        });

        $rows = $rows->map(function ($item, $index) use ($userRows) {
            $row_data = $userRows[$index];

            $userRows = $userRows->forget($index);

            $item = $item->sortBy(function ($taskItem) {
                return $taskItem['position'];
            }, SORT_NUMERIC, false)->values();

            return [
                'row' => $row_data,
                'items' => $item,
            ];
        });

        $rows = $rows->values();
        $emptyRows = $userRows->values();

        $emptyRows = $emptyRows->map(function ($item, $index) {
            return [
                'row' => $item,
                'items' => []
            ];
        });

        $rows = $rows->concat($emptyRows);

        $rows = $rows->values()->toArray();

        return response($rows, 200);
    }

    // Update Row Task Order
    function editTaskOrder(Row $row, Request $request)
    {
        if (!empty($request->tasks)) {
            $tasks = $request->tasks;

            foreach ($tasks as $index => $task) {
                $taskObject = Task::find($task['id']);

                $taskObject->updateOrFail([
                    'position' => $index
                ]);

                $taskObject->save();
            }
        }

        return response()->json(['success' => true], 200);
    }

    // Index All rows
    function indexAll(Request $request)
    {
        $rows = RowResource::collection(
            Row::where("user_id", $request->user()->id)->get()
        )->toArray($request);

        return response()->json(['rows' => $rows], 200);
    }

    // Edit Rows 
    function edit(Row $row, Request $request)
    {
        $row->updateOrFail([
            'title' => $request->title,
            'position' => $request->position
        ]);

        return response()->json(['result' => 'success'], 200);
    }

    // Delete Row
    function destroy(Row $row, Request $request)
    {
        if ($request->has('destination_row_id')) {
            $row->tasks()->getResults()->map(function ($task) use ($request) {
                $task->updateOrFail([
                    'row_id' => $request->destination_row_id
                ]);
            });
        }
        $result = $row->delete();

        return response()->json(['result' => $result], 200);
    }
}
