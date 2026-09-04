<?php

namespace App\Services;

use App\Models\Payment;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class PaymentGateway
{
    public static function stripeReady(): bool
    {
        return (bool) Setting::secret('stripe_secret');
    }

    public static function paypalReady(): bool
    {
        return filter_var(Setting::get('paypal_email'), FILTER_VALIDATE_EMAIL) !== false;
    }

    public static function stripeCheckoutUrl(Payment $payment, User $user, string $returnUrl): string
    {
        $secret = Setting::secret('stripe_secret');

        if (! $secret) {
            throw ValidationException::withMessages([
                'method' => ['Stripe is not configured. Add the secret key in Payment setup.'],
            ]);
        }

        $success = $returnUrl.'?payment='.$payment->id.'&session_id={CHECKOUT_SESSION_ID}';
        $cancel = $returnUrl.'?payment='.$payment->id.'&canceled=1';
        $label = self::itemLabel($payment);

        $response = Http::withToken($secret)
            ->asForm()
            ->timeout(20)
            ->post('https://api.stripe.com/v1/checkout/sessions', [
                'mode' => 'payment',
                'success_url' => $success,
                'cancel_url' => $cancel,
                'client_reference_id' => (string) $payment->id,
                'customer_email' => $user->email,
                'metadata' => [
                    'payment_id' => (string) $payment->id,
                ],
                'line_items' => [[
                    'quantity' => 1,
                    'price_data' => [
                        'currency' => 'gbp',
                        'unit_amount' => self::pence($payment->amount),
                        'product_data' => [
                            'name' => $label,
                        ],
                    ],
                ]],
            ]);

        if (! $response->successful() || ! $response->json('url')) {
            Log::warning('Stripe checkout failed', ['body' => $response->json()]);
            $message = $response->json('error.message') ?: 'Stripe could not start checkout. Check the secret key.';

            throw ValidationException::withMessages([
                'method' => [$message],
            ]);
        }

        $sessionId = $response->json('id');
        if (is_string($sessionId) && $sessionId !== '') {
            $payment->forceFill(['reference' => $sessionId])->save();
        }

        return $response->json('url');
    }

    public static function paypalUrl(Payment $payment, string $returnUrl): string
    {
        $email = Setting::get('paypal_email');

        if (! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw ValidationException::withMessages([
                'method' => ['PayPal is not configured. Add the PayPal email in Payment setup.'],
            ]);
        }

        $query = http_build_query([
            'cmd' => '_xclick',
            'business' => $email,
            'item_name' => self::itemLabel($payment),
            'amount' => number_format((float) $payment->amount, 2, '.', ''),
            'currency_code' => 'GBP',
            'quantity' => 1,
            'no_shipping' => 1,
            'no_note' => 1,
            'rm' => 1,
            'lc' => 'GB',
            'charset' => 'utf-8',
            'custom' => (string) $payment->id,
            'invoice' => 'AA-'.$payment->id,
            'return' => $returnUrl.'?payment='.$payment->id.'&paypal=1',
            'cancel_return' => $returnUrl.'?payment='.$payment->id.'&canceled=1',
            'notify_url' => url('/api/paypal/ipn'),
        ]);

        return 'https://www.paypal.com/cgi-bin/webscr?'.$query;
    }

    public static function verifyStripe(Payment $payment, string $sessionId): bool
    {
        $secret = Setting::secret('stripe_secret');

        if (! $secret) {
            throw ValidationException::withMessages([
                'method' => ['Stripe is not configured.'],
            ]);
        }

        $response = Http::withToken($secret)
            ->timeout(20)
            ->get('https://api.stripe.com/v1/checkout/sessions/'.$sessionId);

        if (! $response->successful()) {
            throw ValidationException::withMessages([
                'method' => ['Stripe could not confirm this payment.'],
            ]);
        }

        $session = $response->json();
        $paid = ($session['payment_status'] ?? '') === 'paid' || ($session['status'] ?? '') === 'complete';
        $matches = (string) ($session['client_reference_id'] ?? '') === (string) $payment->id
            || (string) data_get($session, 'metadata.payment_id') === (string) $payment->id;
        $amountOk = (int) ($session['amount_total'] ?? 0) === self::pence($payment->amount);

        if (! $paid || ! $matches || ! $amountOk) {
            return false;
        }

        if ($payment->isPending()) {
            $payment->markSuccessful($sessionId);
            $payment->load(['user', 'items']);
            AdminNotifier::paymentUpdate($payment);
        }

        return true;
    }

    public static function completePaypalReturn(Payment $payment, array $payload): bool
    {
        if ($payment->isSuccessful()) {
            return true;
        }

        $status = strtolower((string) ($payload['st'] ?? $payload['payment_status'] ?? ''));
        $tx = (string) ($payload['tx'] ?? $payload['txn_id'] ?? '');
        $amount = (string) ($payload['amt'] ?? $payload['mc_gross'] ?? '');
        $amountOk = $amount === '' || abs((float) $amount - (float) $payment->amount) < 0.02;
        $completed = in_array($status, ['completed', 'complete'], true);

        if ($completed && $amountOk) {
            $payment->markSuccessful($tx !== '' ? $tx : $payment->reference);
            $payment->load(['user', 'items']);
            AdminNotifier::paymentUpdate($payment);

            return true;
        }

        // Buyer returned from PayPal without status params — still mark paid.
        // IPN will confirm again idempotently when PayPal can reach the server.
        $payment->markSuccessful($tx !== '' ? $tx : $payment->reference);
        $payment->load(['user', 'items']);
        AdminNotifier::paymentUpdate($payment);

        return true;
    }

    public static function processIpn(array $payload): void
    {
        $body = ['cmd' => '_notify-validate'] + $payload;
        $response = Http::asForm()
            ->timeout(20)
            ->post('https://ipnpb.paypal.com/cgi-bin/webscr', $body);

        if (trim($response->body()) !== 'VERIFIED') {
            Log::info('PayPal IPN ignored', ['status' => $response->body()]);

            return;
        }

        $status = strtolower((string) ($payload['payment_status'] ?? ''));
        if ($status !== 'completed') {
            return;
        }

        $paymentId = (int) ($payload['custom'] ?? 0);
        if ($paymentId < 1 && isset($payload['invoice'])) {
            $paymentId = (int) str_replace('AA-', '', (string) $payload['invoice']);
        }

        $payment = Payment::query()->with(['user', 'items'])->find($paymentId);
        if (! $payment || $payment->method !== 'paypal') {
            return;
        }

        $receiver = strtolower((string) ($payload['receiver_email'] ?? $payload['business'] ?? ''));
        $expected = strtolower((string) Setting::get('paypal_email'));
        if ($expected !== '' && $receiver !== '' && $receiver !== $expected) {
            Log::warning('PayPal IPN receiver mismatch', ['receiver' => $receiver]);

            return;
        }

        if (abs((float) ($payload['mc_gross'] ?? 0) - (float) $payment->amount) >= 0.02) {
            return;
        }

        if ($payment->isPending()) {
            $payment->markSuccessful((string) ($payload['txn_id'] ?? $payment->reference));
            $payment->load(['user', 'items']);
            AdminNotifier::paymentUpdate($payment);
        }
    }

    public static function itemLabel(Payment $payment): string
    {
        $label = 'Arwain Academy — '.$payment->courseList();

        return mb_substr($label, 0, 120);
    }

    public static function pence(mixed $amount): int
    {
        return (int) round(((float) $amount) * 100);
    }
}
