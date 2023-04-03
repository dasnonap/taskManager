<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Fetch all of the current tasks
    public function index(Request $request)
    {
        dd($request);
    }
}
