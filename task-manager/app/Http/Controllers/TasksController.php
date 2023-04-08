<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TasksController extends Controller
{
    //
    function create(Request $request)
    {
        dd('here');
        $validated = $request->validate([
            'title' => ['required', 'string'],
            'description' => ['string'],
            'start_at' => ['date_format:Y/m/d'],
            'end_at' => ['date_format:Y/m/d']
        ]);

        dd($validated);
    }
}
