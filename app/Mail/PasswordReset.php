<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

use App\User;

class PasswordReset extends Mailable
{
    use Queueable, SerializesModels;

    public $user;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user, $token)
    {
        $this->user = $user;
        $this->token = $token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.password_reset')
                    ->to($this->user->email)
                    ->subject('Mot de passe oublié')
                    ->with([
                        'action_url' => url(route('password.reset', [
                            'token' => $this->token,
                        ])),
                        'support_url' => 'mailto:documentation.mobilier@culture.gouv.fr'
                    ]);
    }
}
