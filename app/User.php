<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Mail;

use App\Mail\PasswordReset;

class User extends Authenticatable implements MustVerifyEmail
{
    use Notifiable;

    /**
     * Identity codes, used in the identity_flag db column.
     */
    const IDENTITY_MOBILIER_NATIONAL = 1;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'api_token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'api_token', 'created_at', 'updated_at', 'pivot', 'identity_code'
    ];

    public function selections()
    {
        return $this->belongsToMany('App\Models\Selection');
    }

    public function isMobNat()
    {
        return $this->identityCode === self::IDENTITY_MOBILIER_NATIONAL;
    }

    public function toSearchableArray()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email, // FIXME, this shouldn't be public on all selections
        ];
    }

    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        // $this->notify(new ResetPasswordNotification($token));
        Mail::to($this->email)->send(new PasswordReset($this, $token));
    }
}
