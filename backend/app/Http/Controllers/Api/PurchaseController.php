<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Payment;
use App\Models\PaymentItem;
use App\Services\AdminNotifier;
use App\Services\PaymentGateway;
use App\Support\AllowedFrontendHost;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class PurchaseController extends Controller
{
    public function config(): JsonResponse
    {
        return response()->json([
            'stripe' => PaymentGateway::stripeReady(),
            'paypal' => PaymentGateway::paypalReady(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'phone' => ['nullable', 'string', 'max:40'],
            'method' => ['required', 'in:stripe,paypal'],
            'plan' => ['required', 'in:full,3,6,12,24'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.title' => ['required', 'string', 'max:180'],
            'items.*.slug' => ['nullable', 'string', 'max:180'],
            'items.*.price' => ['nullable', 'numeric'],
            'return_url' => ['required', 'url', 'max:500'],
        ]);

        $returnUrl = $this->safeReturnUrl($data['return_url']);
        $amount = $this->chargeAmount($data['items'], $data['plan']);
        $free = $amount <= 0;

        if (! $free) {
            if ($data['method'] === 'stripe' && ! PaymentGateway::stripeReady()) {
                throw ValidationException::withMessages([
                    'method' => ['Stripe is not configured yet. Ask the academy to add Stripe keys.'],
                ]);
            }
            if ($data['method'] === 'paypal' && ! PaymentGateway::paypalReady()) {
                throw ValidationException::withMessages([
                    'method' => ['PayPal is not configured yet. Ask the academy to add a PayPal email.'],
                ]);
            }
        }

        $user = $request->user();

        $payment = DB::transaction(function () use ($data, $user, $free, $amount) {
            $payment = Payment::query()->create([
                'user_id' => $user->id,
                'method' => $data['method'],
                'plan' => $data['plan'],
                'amount' => $amount,
                'status' => $free ? 'successful' : 'pending',
                'phone' => $data['phone'] ?? null,
                'paid_at' => $free ? now() : null,
            ]);

            foreach ($data['items'] as $item) {
                PaymentItem::query()->create([
                    'payment_id' => $payment->id,
                    'title' => $item['title'],
                    'slug' => $item['slug'] ?? null,
                    'price' => $item['price'] ?? 0,
                ]);
            }

            return $payment->load(['user', 'items']);
        });

        AdminNotifier::paymentUpdate($payment);

        $redirectUrl = null;
        if (! $free) {
            $redirectUrl = $payment->method === 'paypal'
                ? PaymentGateway::paypalUrl($payment, $returnUrl)
                : PaymentGateway::stripeCheckoutUrl($payment, $user, $returnUrl);
        }

        return response()->json([
            'ok' => true,
            'payment' => $this->payload($payment),
            'redirect_url' => $redirectUrl,
        ]);
    }

    public function index(Request $request): JsonResponse
    {
        $payments = Payment::query()
            ->with('items')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();
        $catalog = Course::query()->get();

        return response()->json([
            'payments' => $payments->map(fn (Payment $payment) => [
                'id' => $payment->id,
                'status' => $payment->status,
                'method' => $payment->method,
                'method_label' => $payment->methodLabel(),
                'plan' => $payment->plan,
                'plan_label' => $payment->planLabel(),
                'amount' => (float) $payment->amount,
                'paid_at' => optional($payment->paid_at ?? $payment->created_at)->toIso8601String(),
                'items' => $payment->items->map(function ($item) use ($catalog) {
                    $course = Course::matchPurchase($item->slug, (string) $item->title, $catalog);

                    return [
                        'title' => $item->title,
                        'slug' => $item->slug ?: $course?->slug,
                        'price' => (float) $item->price,
                        'image' => $course?->image ? $course->image_url : null,
                        'category' => $course?->category,
                    ];
                })->values()->all(),
            ])->values()->all(),
        ]);
    }

    public function show(Request $request, Payment $payment): JsonResponse
    {
        $this->assertOwner($request, $payment);
        $payment->load(['user', 'items']);

        return response()->json([
            'ok' => true,
            'payment' => $this->payload($payment),
        ]);
    }

    public function verify(Request $request, Payment $payment): JsonResponse
    {
        $this->assertOwner($request, $payment);
        $data = $request->validate([
            'session_id' => ['required', 'string', 'max:255'],
        ]);

        $payment->load(['user', 'items']);

        if ($payment->isSuccessful()) {
            return response()->json(['ok' => true, 'payment' => $this->payload($payment)]);
        }

        if ($payment->method !== 'stripe' || ! PaymentGateway::verifyStripe($payment, $data['session_id'])) {
            throw ValidationException::withMessages([
                'method' => ['Stripe has not confirmed this payment yet.'],
            ]);
        }

        $payment->refresh()->load(['user', 'items']);

        return response()->json([
            'ok' => true,
            'payment' => $this->payload($payment),
        ]);
    }

    public function paypalReturn(Request $request, Payment $payment): JsonResponse
    {
        $this->assertOwner($request, $payment);
        $payment->load(['user', 'items']);

        if ($payment->method !== 'paypal') {
            throw ValidationException::withMessages([
                'method' => ['This order is not a PayPal payment.'],
            ]);
        }

        PaymentGateway::completePaypalReturn($payment, $request->all());
        $payment->refresh()->load(['user', 'items']);

        return response()->json([
            'ok' => true,
            'payment' => $this->payload($payment),
        ]);
    }

    public function paypalIpn(Request $request): Response
    {
        try {
            PaymentGateway::processIpn($request->all());
        } catch (\Throwable $e) {
            report($e);
        }

        return response('OK', 200);
    }

    public function pay(Request $request, Payment $payment): JsonResponse
    {
        $this->assertOwner($request, $payment);
        $data = $request->validate([
            'return_url' => ['required', 'url', 'max:500'],
        ]);
        $returnUrl = $this->safeReturnUrl($data['return_url']);
        $payment->load(['user', 'items']);

        if ($payment->isSuccessful()) {
            return response()->json([
                'ok' => true,
                'payment' => $this->payload($payment),
                'redirect_url' => null,
            ]);
        }

        $user = $request->user();
        $redirectUrl = $payment->method === 'paypal'
            ? PaymentGateway::paypalUrl($payment, $returnUrl)
            : PaymentGateway::stripeCheckoutUrl($payment, $user, $returnUrl);

        return response()->json([
            'ok' => true,
            'payment' => $this->payload($payment),
            'redirect_url' => $redirectUrl,
        ]);
    }

    private function assertOwner(Request $request, Payment $payment): void
    {
        if ($payment->user_id !== $request->user()->id) {
            abort(403);
        }
    }

    private function chargeAmount(array $items, string $plan): float
    {
        $subtotal = round(collect($items)->sum(fn ($item) => (float) ($item['price'] ?? 0)), 2);
        $months = $plan === 'full' ? 1 : max(1, (int) $plan);

        if ($months === 1) {
            return $subtotal;
        }

        return (float) ceil($subtotal / $months);
    }

    private function safeReturnUrl(string $url): string
    {
        $parts = parse_url($url);
        $scheme = $parts['scheme'] ?? '';
        $host = $parts['host'] ?? '';
        $path = $parts['path'] ?? '/';
        $allowedHost = AllowedFrontendHost::matches($host);

        if (! in_array($scheme, ['http', 'https'], true) || ! $allowedHost || ! str_ends_with($path, '/checkout')) {
            throw ValidationException::withMessages([
                'return_url' => ['Invalid checkout return URL.'],
            ]);
        }

        return $scheme.'://'.$host.(isset($parts['port']) ? ':'.$parts['port'] : '').$path;
    }

    private function payload(Payment $payment): array
    {
        return [
            'id' => $payment->id,
            'status' => $payment->status,
            'method' => $payment->method,
            'method_label' => $payment->methodLabel(),
            'plan' => $payment->plan,
            'amount' => (float) $payment->amount,
            'courses' => $payment->items->pluck('title')->values()->all(),
        ];
    }
}
