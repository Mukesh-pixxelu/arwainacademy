<?php

namespace App\Support;

class AllowedFrontendHost
{
    public static function matches(string $host): bool
    {
        if ($host === '') {
            return false;
        }

        $allowed = ['localhost', '127.0.0.1', 'pixxelu.com', 'arwainacademy.com'];

        foreach ([config('app.url'), config('app.frontend_url')] as $configured) {
            $configuredHost = parse_url((string) $configured, PHP_URL_HOST);
            if (is_string($configuredHost) && $configuredHost !== '') {
                $allowed[] = $configuredHost;
            }
        }

        if (in_array($host, $allowed, true)) {
            return true;
        }

        foreach ($allowed as $name) {
            if ($name !== 'localhost' && $name !== '127.0.0.1' && str_ends_with($host, '.'.$name)) {
                return true;
            }
        }

        return false;
    }
}
