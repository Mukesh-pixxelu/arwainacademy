<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class PasswordResetController extends Controller
{
    public function forgot(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'reset_url' => ['required', 'url', 'max:500'],
        ]);

        $resetUrl = $this->safeResetUrl($data['reset_url']);
        $user = User::query()->where('email', $data['email'])->first();

        if ($user && $user->isStudent()) {
            config(['app.frontend_url' => $resetUrl]);
            Password::sendResetLink(['email' => $data['email']]);
        }

        return response()->json([
            'ok' => true,
            'message' => 'If that email is on our records, we have sent a reset link.',
        ]);
    }

    public function reset(Request $request): JsonResponse
    {
        $data = $request->validate([
            'token' => ['required', 'string'],
            'email' => ['required', 'email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $status = Password::reset($data, function (User $user, string $password) {
            if ($user->isAdmin()) {
                throw ValidationException::withMessages([
                    'email' => ['Admin accounts reset their password on the academy portal.'],
                ]);
            }

            $user->forceFill([
                'password' => $password,
                'remember_token' => Str::random(60),
                'api_token' => null,
            ])->save();

            event(new PasswordReset($user));
        });

        if ($status !== Password::PASSWORD_RESET) {
            throw ValidationException::withMessages([
                'email' => [__($status)],
            ]);
        }

        return response()->json([
            'ok' => true,
            'message' => 'Password updated. You can sign in now.',
        ]);
    }

    private function safeResetUrl(string $url): string
    {
        $parts = parse_url($url);
        $scheme = $parts['scheme'] ?? '';
        $host = $parts['host'] ?? '';
        $path = rtrim($parts['path'] ?? '', '/');
        $allowedHost = in_array($host, ['localhost', '127.0.0.1'], true)
            || $host === 'pixxelu.com'
            || str_ends_with($host, '.pixxelu.com');

        if (! in_array($scheme, ['http', 'https'], true) || ! $allowedHost || ! str_ends_with($path, '/user/reset-password')) {
            throw ValidationException::withMessages([
                'reset_url' => ['Invalid reset URL.'],
            ]);
        }

        return $scheme.'://'.$host.(isset($parts['port']) ? ':'.$parts['port'] : '').$path;
    }
}
