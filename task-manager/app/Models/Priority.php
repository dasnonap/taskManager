<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Priority extends Model
{
    use HasFactory;

    public $fillable = [
        'name',
        'color',
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
