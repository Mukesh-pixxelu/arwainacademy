@extends('layouts.auth')

@section('title', 'Register')
@section('visual-kicker', 'Join the academy')
@section('visual-title', 'Create your student account, then start the course that fits you.')
@section('visual-src', asset('images/coaching.jpg'))

@section('content')
    <p class="gate-kicker">Students</p>
    <h2>Create account</h2>
    <p class="gate-lead">Register as a student to access your dashboard.</p>

    <form method="POST" action="{{ route('register.store') }}">
        @csrf

        <label class="gate-field">
            Full name
            <input type="text" name="name" value="{{ old('name') }}" required>
        </label>
        @error('name')
            <p class="gate-error">{{ $message }}</p>
        @enderror

        <label class="gate-field">
            Email address
            <input type="email" name="email" value="{{ old('email') }}" required>
        </label>
        @error('email')
            <p class="gate-error">{{ $message }}</p>
        @enderror

        <label class="gate-field">
            Phone number
            <input type="tel" name="phone" value="{{ old('phone') }}" required autocomplete="tel">
        </label>
        @error('phone')
            <p class="gate-error">{{ $message }}</p>
        @enderror

        <label class="gate-field">
            Password
            <x-password-input required minlength="8" autocomplete="new-password" />
        </label>
        @error('password')
            <p class="gate-error">{{ $message }}</p>
        @enderror

        <label class="gate-field">
            Confirm password
            <x-password-input name="password_confirmation" required minlength="8" autocomplete="new-password" />
        </label>

        <button class="gate-submit" type="submit">Create account</button>
    </form>

    <p class="gate-switch">
        Already registered?
        <a href="{{ route('login') }}">Sign in</a>
    </p>
@endsection
