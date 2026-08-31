<?php

namespace App\Providers;

use App\Models\AdminNotification;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Paginator::defaultView('vendor.pagination.simple');
        Paginator::defaultSimpleView('vendor.pagination.simple');
        $this->configureHttpClient();
        $this->configurePasswordResetUrls();

        if ($this->app->environment('production')) {
            URL::forceScheme('https');
            URL::forceRootUrl(rtrim((string) config('app.url'), '/'));
        }

        View::composer('layouts.panel', function ($view) {
            if (! auth()->check() || ! auth()->user()->isAdmin()) {
                $view->with([
                    'adminNotifications' => collect(),
                    'unreadNotificationCount' => 0,
                ]);

                return;
            }

            $view->with([
                'adminNotifications' => AdminNotification::query()->latest()->take(12)->get(),
                'unreadNotificationCount' => AdminNotification::query()->whereNull('read_at')->count(),
            ]);
        });
    }

    private function configureHttpClient(): void
    {
        $candidates = [
            resource_path('certs/cacert.pem'),
            'C:\\MAMP\\bin\\apache\\bin\\cacert.pem',
            (string) ini_get('curl.cainfo'),
            (string) ini_get('openssl.cafile'),
        ];

        foreach ($candidates as $path) {
            if ($path !== '' && is_file($path)) {
                Http::globalOptions(['verify' => $path]);

                return;
            }
        }

        if (! $this->app->environment('production')) {
            Http::globalOptions(['verify' => false]);
        }
    }

    private function configurePasswordResetUrls(): void
    {
        ResetPassword::createUrlUsing(function ($user, string $token) {
            if ($user->isAdmin()) {
                return url('/admin/reset-password/'.$token).'?email='.urlencode($user->email);
            }

            $base = rtrim((string) config('app.frontend_url'), '/');
            $url = str_ends_with($base, '/user/reset-password')
                ? $base
                : $base.'/user/reset-password';

            return $url.'?token='.$token.'&email='.urlencode($user->email);
        });
    }
}
