<?php

namespace App\Http\Controllers;

use App\Models\Row;
use Illuminate\Http\Request;

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

    function index(Request $request)
    {
        $user = $request->user();

        $userRows = $user->with('rows.tasks')->get();

        dd($userRows);
    }
}
