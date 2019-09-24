<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

use App\Mail\UserInvitation;
use App\Models\Selection;
use App\Models\Invitation;

class InvitationController extends Controller
{
    public function create(Request $request, $selection_id)
    {
        $selection = Selection::findOrFail($selection_id);

        $this->authorize('invite', $selection);

        $request->validate([
            'email' => 'required|email:rfc'
        ]);

        $invitation = new Invitation;
        $invitation->email = $request->input('email');
        $invitation->selection_id = $selection->id;
        $invitation->user_id = Auth::user()->id;
        $invitation->save();

        Mail::to($invitation->email)->send(new UserInvitation($invitation));


        return response()->json(['invitation' => $invitation]);
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
