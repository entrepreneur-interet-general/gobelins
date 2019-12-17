<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class EmailVerification extends Mailable
{
    use Queueable, SerializesModels;

    public $action_url;
    public $user;
    public $profile_url;
    public $support_email;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($url, $user)
    {
        $this->action_url = $url;
        $this->user = $user;
        $this->profile_url = route('selections');
        $this->support_email = 'documentation.mobilier@culture.gouv.fr';
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.verify-email')
                    ->to($this->user->email)
                    ->subject('Bienvenue dans la collection du Mobilier national');
    }
}
