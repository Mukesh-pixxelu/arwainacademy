@extends('layouts.auth')

@section('title', 'Forgot password')
@section('visual-kicker', 'Admin access')
@section('visual-title', 'Reset your password and get back to the academy portal.')

@section('content')
    <p class="gate-kicker">Admin</p>
    <h2>Forgot password</h2>
    <p class="gate-lead">Enter your admin email and we will send a reset link if an account exists.</p>

    <form method="POST" action="{{ route('password.email') }}">
        @csrf

        <label class="gate-field">
            Email address
            <input type="email" name="email" value="{{ old('email') }}" required autofocus>
        </label>
        @error('email')
            <p class="gate-error">{{ $message }}</p>
        @enderror

        <button class="gate-submit" type="submit">Send reset link</button>
    </form>

    <p class="gate-switch">
        <a href="{{ route('login') }}">Back to sign in</a>
    </p>
@endsection
