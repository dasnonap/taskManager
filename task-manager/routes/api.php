<?php

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
    Route::post('/tasks', [TasksController::class, 'create'])->name('tasks.create');

    Route::post('/rows', [RowsController::class, 'create'])->name('rows.create');

    Route::get('/rows', [RowsController::class, 'index'])->name('rows.index');

    Route::post('/priorities', [PriorityController::class, 'create'])->name('priority.create');

    Route::get('/priorities', [PriorityController::class, 'index'])->name('priority.index');
});
