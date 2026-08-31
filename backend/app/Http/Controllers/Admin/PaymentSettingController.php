<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class PaymentSettingController extends Controller
{
    public function edit(): View
    {
        return view('admin.settings.payments', [
            'paypalEmail' => Setting::get('paypal_email', ''),
            'stripeKey' => Setting::get('stripe_key', ''),
            'hasStripeSecret' => Setting::has('stripe_secret'),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'paypal_email' => ['nullable', 'email', 'max:255'],
            'stripe_key' => ['nullable', 'string', 'max:255'],
            'stripe_secret' => ['nullable', 'string', 'max:255'],
        ]);

        Setting::put('paypal_email', $data['paypal_email'] ?? '');
        Setting::put('stripe_key', $data['stripe_key'] ?? '');
        Setting::putSecret('stripe_secret', $data['stripe_secret'] ?? null);

        return back()->with('success', 'Payment options saved.');
    }
}
