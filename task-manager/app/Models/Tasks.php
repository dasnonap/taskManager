<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    use HasFactory;
    use HasUuids;

    public $fillable = [
        'user_id',
        'title',
        'description',
        'start_time',
        'end_time',
        'closed_at'
    ];
}
