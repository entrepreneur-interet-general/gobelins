<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

use App\Models\Invitation;

class UserInvitation extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Invitation $invitation)
    {
        $this->invitation = $invitation;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.user_invitation')->with([
            'name' => $this->invitation->email,
            'invite_sender_name' => $this->invitation->inviter->name,
            'support_email' => 'documentation.mobilier@culture.gouv.fr',
            'action_url' => route('invitation_landing', ['invitation_id' => $this->invitation->selection_id]),
        ]);
    }
}
