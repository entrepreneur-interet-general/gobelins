<?php

namespace App\Policies;

use App\User;
use App\Models\Selection;
use Illuminate\Auth\Access\HandlesAuthorization;

class InvitationPolicy
{
    use HandlesAuthorization;

    /**
     * A user needs to be a collaborator on a selection
     * to invite other users to that selection
     *
     * @param User $user
     * @param Selection $selection
     * @return boolean
     */
    public function create(User $user, Selection $selection)
    {
        return $selection->users->contains($user);
    }

    /**
     * A user needs to be a collaborator on a selection
     * to delete invitations to that selection.
     *
     * @param User $user
     * @return void
     */
    public function delete(User $user, Selection $selection)
    {
        return $selection->users->contains($user);
    }
}
