<?php

namespace App\Http\Controllers;

use App\Http\Resources\PriorityResource;
use App\Models\Priority;
use Illuminate\Http\Request;

class PriorityController extends Controller
{
    function index(Request $request)
    {
        $priorities = PriorityResource::collection(Priority::get());

        $priorities = $priorities->toArray($request);

        return response($priorities, 200);
    }

    function create(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string'],
            'color' => ['required', 'string']
        ]);

        $priority = new Priority([
            'name' => $request->name,
            'color' => $request->color
        ]);

        $priority->save();

        return response()->json(['status' => !empty($priority)], 201);
    }
}
