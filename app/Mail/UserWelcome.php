<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

use App\User;

class UserWelcome extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.user_welcome')->with([
            'name' => $this->user->name,
            'email' => $this->user->email,
            'profile_url' => route('selections'),
            'support_email' => 'documentation.mobilier@culture.gouv.fr',
            'action_url' => route('register'), // Confirm email
        ]);
    }
}
