@extends('layouts.panel')

@section('title', 'Payment setup')
@section('eyebrow', 'Payments')
@section('heading', 'Payment options')

@section('content')
    @if(session('success'))
        <p class="flash success">{{ session('success') }}</p>
    @endif

    <form class="pay-setup" method="POST" action="{{ route('admin.settings.payments.update') }}">
        @csrf
        @method('PUT')

        <section class="form-card pay-setup-card">
            <p class="pay-setup-kicker">PayPal</p>
            <h2>PayPal email</h2>
            <p class="muted">Website checkout sends the student to PayPal, paid to this email.</p>
            <label>
                PayPal email
                <input type="email" name="paypal_email" value="{{ old('paypal_email', $paypalEmail) }}" placeholder="payments@arwainacademy.com">
            </label>
            @error('paypal_email') <small class="error">{{ $message }}</small> @enderror
        </section>

        <section class="form-card pay-setup-card">
            <p class="pay-setup-kicker">Stripe</p>
            <h2>Stripe keys</h2>
            <p class="muted">Website checkout opens Stripe Checkout with these keys. Secret key is required.</p>
            <label>
                Publishable key
                <input type="text" name="stripe_key" value="{{ old('stripe_key', $stripeKey) }}" placeholder="pk_live_...">
            </label>
            @error('stripe_key') <small class="error">{{ $message }}</small> @enderror

            <label>
                Secret key
                <input type="password" name="stripe_secret" placeholder="{{ $hasStripeSecret ? 'Saved — leave blank to keep it' : 'sk_live_...' }}" autocomplete="new-password">
            </label>
            @error('stripe_secret') <small class="error">{{ $message }}</small> @enderror
            @if($hasStripeSecret)
                <p class="muted">A secret key is already saved. Enter a new one only if you want to replace it.</p>
            @endif
        </section>

        <button class="btn" type="submit">Save payment options</button>
    </form>
@endsection
