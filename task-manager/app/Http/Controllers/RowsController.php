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

        return redirect('/dashboard');
    }
}
