<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentsResource;
use App\Models\Comment;
use App\Models\Task;
use Illuminate\Http\Request;
use LogicException;

class CommentsController extends Controller
{
    // Index all comments for a task
    public function index(Request $request)
    {
        $request->validate(
            [
                'task' => ['string', 'required']
            ]
        );

        $comments = CommentsResource::collection(
            Comment::where('task_id', $request->task)
                ->with('user')
                ->latest()
                ->take(5)
                ->get()
        )->toArray($request);

        $comments = array_reverse($comments);

        return response()->json($comments, 201);
    }

    //Create Comment
    public function create(Request $request)
    {
        $request->validate(
            [
                'comment' => ['string', 'required'],
                'task_id' => ['string', 'required']
            ]
        );
        $task = Task::find($request->task_id);

        if (empty($task)) {
            throw new LogicException("Task is not valid.");
        }

        $comment = new Comment([
            'task_id' => $task->id,
            'comment' => $request->comment,
            'user_id' => $request->user()->id,
        ]);

        $comment->save();

        if (empty($comment)) {
            throw new LogicException("Comment couldn't be created");
        }

        return response()->json(['status' => true], 201);
    }
}
