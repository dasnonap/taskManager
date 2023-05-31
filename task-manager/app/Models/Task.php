<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    use HasUuids;

    public $fillable = [
        'user_id',
        'title',
        'description',
        'start_time',
        'end_time',
        'closed_at',
        'row_id',
    ];

    public function row()
    {
        return $this->belongsTo(Row::class);
    }

    public function priorities()
    {
        return $this->belongsToMany(Priority::class, 'task_priority', 'task_id', 'priority_id');
    }
}
