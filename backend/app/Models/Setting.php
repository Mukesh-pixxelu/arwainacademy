<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

#[Fillable(['key', 'value'])]
class Setting extends Model
{
    public static function get(string $key, mixed $default = null): mixed
    {
        $row = static::query()->where('key', $key)->first();

        return $row?->value ?? $default;
    }

    public static function put(string $key, ?string $value): void
    {
        static::query()->updateOrCreate(
            ['key' => $key],
            ['value' => $value]
        );
    }

    public static function putSecret(string $key, ?string $value): void
    {
        if ($value === null || $value === '') {
            return;
        }

        static::put($key, Crypt::encryptString($value));
    }

    public static function secret(string $key): ?string
    {
        $value = static::get($key);

        if (! $value) {
            return null;
        }

        try {
            return Crypt::decryptString($value);
        } catch (\Throwable) {
            return null;
        }
    }

    public static function has(string $key): bool
    {
        $value = static::get($key);

        return is_string($value) && $value !== '';
    }
}
