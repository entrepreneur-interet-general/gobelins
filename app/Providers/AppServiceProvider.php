<?php

namespace App\Providers;

use App\Mail\EmailVerification;
use App\Observers\UserObserver;
use App\Repositories\SectionRepository;
use App\User;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(SectionRepository $sectionRepository)
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

        View::share('nav', $sectionRepository->cachedNavSections());

        Relation::morphMap([
            'articles' => 'App\Models\Article',
        ]);

        Blade::if('route', function ($route) {
            return request()->route()->named($route);
        });

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
