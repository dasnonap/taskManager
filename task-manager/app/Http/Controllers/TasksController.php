<?php

namespace App\Http\Controllers;

use App\Models\Tasks;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TasksController extends Controller
{
    // Create Task
    function create(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'start_at' => ['required', 'date_format:Y-m-d'],
            'end_at' => ['required', 'date_format:Y-m-d']
        ]);

        $task = new Tasks([
            'title' => $request->title,
            'user_id' => Auth::id(),
            'description' => $request->description,
            'start_time' => $request->start_at,
            'end_time' => $request->end_at,
        ]);
        $task->save();

        return redirect('/dashboard');
    }
}
