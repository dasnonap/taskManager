<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Task;
use Illuminate\Http\Request;
use LogicException;

class CommentsController extends Controller
{
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
            'comment' => $request->comment
        ]);

        $comment->save();

        if (empty($comment)) {
            throw new LogicException("Comment couldn't be created");
        }

        return response()->json(['status' => true], 201);
    }
}
