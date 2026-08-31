<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

$basePath = dirname(__DIR__);
$composerPath = $basePath.DIRECTORY_SEPARATOR.'composer.json';

if (! is_file($composerPath)) {
    $stub = <<<'JSON'
{
    "name": "arwain/academy",
    "autoload": {
        "psr-4": {
            "App\\": "app/"
        }
    }
}
JSON;
    @file_put_contents($composerPath, $stub);
}

return Application::configure(basePath: $basePath)
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'admin' => \App\Http\Middleware\EnsureUserIsAdmin::class,
            'api.token' => \App\Http\Middleware\AuthenticateApiToken::class,
        ]);
        $middleware->redirectGuestsTo('/admin/login');
        $middleware->validateCsrfTokens(except: [
            'api/*',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );
    })->create();
