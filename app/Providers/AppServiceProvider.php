<?php

namespace App\Providers;

use App\User;
use App\Observers\UserObserver;
use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Support\Facades\View;

use App\Mail\EmailVerification;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        User::observe(UserObserver::class);

        // Set callback for verifying an email address.
        // Hook up the Mailable with the built-in notification.
        VerifyEmail::toMailUsing(function ($notifiable, $verificationUrl) {
            return new EmailVerification($verificationUrl, $notifiable);
        });

        View::composer(
            ['site.search', 'site.selection'],
            'App\Http\View\Composers\FiltersComposer'
        );
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
