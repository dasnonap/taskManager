<?php

use App\Http\Controllers\CommentsController;
use App\Http\Controllers\PriorityController;
use App\Http\Controllers\RowsController;
use App\Http\Controllers\TasksController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {

    // Tasks Endpoints
    Route::post('/tasks', [TasksController::class, 'create'])->name('tasks.create');

    Route::put('/tasks/{task}', [TasksController::class, 'update'])->name('tasks.update');

    // Rows Endpoints
    Route::post('/rows', [RowsController::class, 'create'])->name('rows.create');

    Route::get('/rows', [RowsController::class, 'index'])->name('rows.index');

    // Priorities Endpoints
    Route::post('/priorities', [PriorityController::class, 'create'])->name('priority.create');

    Route::get('/priorities', [PriorityController::class, 'index'])->name('priority.index');

    // Comments Endpoints
    Route::post('/comments', [CommentsController::class, 'create'])->name('comments.create');
});
