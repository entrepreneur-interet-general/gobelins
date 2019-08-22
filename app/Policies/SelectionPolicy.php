<?php

namespace App\Policies;

use App\User;
use App\Models\Selection;
use Illuminate\Auth\Access\HandlesAuthorization;

class SelectionPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the selection.
     *
     * @param  \App\User  $user
     * @param  \App\Models\Selection  $selection
     * @return bool
     */
    public function view(?User $user, Selection $selection)
    {
        return $selection->public || $selection->users->contains($user);
    }

    /**
     * Determine whether the user can create selections.
     *
     * @param  \App\User  $user
     * @return bool
     */
    public function create(User $user)
    {
        return true; // All authenticated users can create selections.
    }

    /**
     * Determine whether the user can update the selection.
     *
     * @param  \App\User  $user
     * @param  \App\Models\Selection  $selection
     * @return bool
     */
    public function update(User $user, Selection $selection)
    {
        return $selection->users->contains($user);
    }

    /**
     * Determine whether the user can delete the selection.
     *
     * @param  \App\User  $user
     * @param  \App\Models\Selection  $selection
     * @return bool
     */
    public function delete(User $user, Selection $selection)
    {
        return $selection->users->contains($user);
    }

    /**
     * Determine whether the user can restore the selection.
     *
     * @param  \App\User  $user
     * @param  \App\Models\Selection  $selection
     * @return bool
     */
    public function restore(User $user, Selection $selection)
    {
        return $selection->users->contains($user);
    }

    /**
     * Determine whether the user can permanently delete the selection.
     *
     * @param  \App\User  $user
     * @param  \App\Models\Selection  $selection
     * @return bool
     */
    public function forceDelete(User $user, Selection $selection)
    {
        return $selection->users->contains($user);
    }
}
