@extends('layouts.auth')

@section('title', 'Reset password')
@section('visual-kicker', 'Admin access')
@section('visual-title', 'Choose a new password for the academy portal.')

@section('content')
    <p class="gate-kicker">Admin</p>
    <h2>New password</h2>
    <p class="gate-lead">Use at least 8 characters, then sign in with your new password.</p>

    <form method="POST" action="{{ route('password.update') }}">
        @csrf
        <input type="hidden" name="token" value="{{ $token }}">

        <label class="gate-field">
            Email address
            <input type="email" name="email" value="{{ old('email', $email) }}" required>
        </label>
        @error('email')
            <p class="gate-error">{{ $message }}</p>
        @enderror

        <label class="gate-field">
            New password
            <x-password-input required minlength="8" autocomplete="new-password" />
        </label>
        @error('password')
            <p class="gate-error">{{ $message }}</p>
        @enderror

        <label class="gate-field">
            Confirm password
            <x-password-input name="password_confirmation" required minlength="8" autocomplete="new-password" />
        </label>

        <button class="gate-submit" type="submit">Update password</button>
    </form>
@endsection
