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

        // Blade directive to set "is-current" CSS classes, infered from
        // the current route and params.
        Blade::if('route', function ($route, $params = array()) {
            // Check if we are currently using the given named route.
            if (request()->route()->named($route)) {
                // Check if we are using the required params for that route.
                if (count($params)) {
                    $params_used = array_intersect($params, request()->route()->parameters());
                    if (!empty($params_used)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return true;
                }
            } else {
                return false;
            }
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
