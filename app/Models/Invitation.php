<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Models\Selection;

class Invitation extends Model
{
    protected $visible = ['id', 'email', 'selection_id'];

    public function inviter()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function selection()
    {
        return $this->belongsTo(Selection::class);
    }
}
