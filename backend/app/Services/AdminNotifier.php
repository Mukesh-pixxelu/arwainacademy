<?php

namespace App\Services;

use App\Models\AdminNotification;
use App\Models\Payment;
use App\Models\User;

class AdminNotifier
{
    public static function studentLoggedIn(User $user): void
    {
        if ($user->isAdmin()) {
            return;
        }

        self::push(
            'login',
            $user->name.' signed in',
            $user->email.' just logged in to the student portal.',
            ['user_id' => $user->id, 'email' => $user->email],
        );
    }

    public static function studentRegistered(User $user): void
    {
        self::push(
            'register',
            'New student registered',
            $user->name.' created an account ('.$user->email.($user->phone ? ', '.$user->phone : '').').',
            ['user_id' => $user->id, 'email' => $user->email, 'phone' => $user->phone],
        );
    }

    public static function coursePurchased(
        string $name,
        string $email,
        array $courseTitles,
        float $total,
        string $method,
        ?int $userId = null,
    ): void {
        $courses = $courseTitles ? implode(', ', $courseTitles) : 'a course';

        self::push(
            'purchase',
            $name.' purchased a course',
            $name.' ('.$email.') bought '.$courses.' — £'.number_format($total, 0).' via '.$method.'.',
            [
                'user_id' => $userId,
                'email' => $email,
                'courses' => $courseTitles,
                'total' => $total,
                'method' => $method,
            ],
        );
    }

    public static function paymentUpdate(Payment $payment): void
    {
        $user = $payment->user;
        $courses = $payment->courseList();
        $amount = '£'.number_format((float) $payment->amount, 0);
        $method = $payment->methodLabel();
        $meta = [
            'user_id' => $user?->id,
            'email' => $user?->email,
            'courses' => $payment->items->pluck('title')->values()->all(),
            'total' => (float) $payment->amount,
            'method' => $method,
            'status' => $payment->status,
            'payment_id' => $payment->id,
        ];

        if ($payment->isPending()) {
            self::push(
                'payment-pending',
                $user->name.' started a payment',
                $user->name.' ('.$user->email.') selected '.$method.' for '.$courses.' — '.$amount.'. Status: pending.',
                $meta,
            );

            return;
        }

        self::push(
            'purchase',
            $user->name.' paid successfully',
            $user->name.' ('.$user->email.') paid '.$amount.' via '.$method.' for '.$courses.'. Status: successful.',
            $meta,
        );
    }

    public static function push(string $type, string $title, string $body, array $meta = []): AdminNotification
    {
        return AdminNotification::query()->create([
            'type' => $type,
            'title' => $title,
            'body' => $body,
            'meta' => $meta,
        ]);
    }
}
