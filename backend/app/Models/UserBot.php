<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserBot extends Model
{
    use HasFactory;

    protected $table = 'user_bot';

    protected $fillable = [
        'user_id',
        'bot_id'
    ];
}
