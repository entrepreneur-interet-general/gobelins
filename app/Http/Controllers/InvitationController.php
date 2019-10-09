<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

use App\Mail\UserInvitation;
use App\Models\Selection;
use App\Models\Invitation;
use App\User;

class InvitationController extends Controller
{
    public function create(Request $request, $selection_id)
    {
        $selection = Selection::findOrFail($selection_id);

        $this->authorize('invite', $selection);

        $request->validate([
            'email' => 'required|email:rfc'
        ]);

        // Does a user with this email address already exist?
        $user = User::where('email', '=', $request->input('email'))->first();
        
        $invitation = new Invitation;
        $invitation->email = $request->input('email');
        $invitation->selection_id = $selection->id;
        $invitation->user_id = Auth::user()->id;

        if ($user) {
            // Only attach the user if they aren't already collaborating!
            if (!$selection->users->pluck('id')->contains($user->id)) {
                $selection->users()->attach($user);
            }
            Mail::to($user->email)->send(new UserInvitation($invitation));

            return response()->json(['user' => $user]);
        } else {
            $invitation->save();
    
            Mail::to($invitation->email)->send(new UserInvitation($invitation));
    
            return response()->json(['invitation' => $invitation]);
        }
    }
    
    
    public function destroy(Request $request, $selection_id, $invitation_id)
    {
        $selection = Selection::findOrFail($selection_id);
        $invitation = Invitation::where([
            ['id', '=', $invitation_id],
            ['selection_id', '=', $selection_id]
        ])->firstOrFail();

        $this->authorize('uninvite', $selection);

        if ($invitation->delete()) {
            return response()->json(['status' => 'ok']);
        };
    }
}
