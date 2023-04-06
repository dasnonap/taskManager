<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $editable = [
        'title',
        'description',
        'start_time',
        'end_time',
        'closed_at',
        'created_at',
        'updated_at'
    ];
}
