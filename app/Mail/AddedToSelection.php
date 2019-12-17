<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

use App\User;
use App\Models\Selection;

class AddedToSelection extends Mailable
{
    use Queueable, SerializesModels;

    public $user_added;
    public $user_adding;
    public $selection;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user_added, User $user_adding, Selection $selection)
    {
        $this->user_added = $user_added;
        $this->user_adding = $user_adding;
        $this->selection = $selection;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.added_to_selection')
        ->subject('Vous participez à la sélection "' . $this->selection->name . '"')
        ->with([
            'support_email' => 'documentation.mobilier@culture.gouv.fr',
            'action_url' => route('invitation_landing', [
                'selection_id' => $this->selection->id,
            ]),
        ]);
        ;
    }
}
