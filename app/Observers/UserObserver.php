<?php

namespace App\Observers;

use App\User;

class UserObserver
{

    /**
     * Handle the user "deleted" event.
     *
     * @param  \App\User  $user
     * @return void
     */
    public function deleting(User $user)
    {
        // Prevent deletion of default super admin account.
        if ($user->isMobNat()) {
            return false;
        }

        // Delete or detach related Selections.
        $user->selections()->each(function ($s) use (&$user) {
            if ($s->users()->count() > 1) {
                $s->users()->detach($user->id);
            } else {
                $s->delete();
            }
        });

        return true;
    }
}
