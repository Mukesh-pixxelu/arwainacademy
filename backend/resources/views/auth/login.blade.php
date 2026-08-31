@extends('layouts.auth')

@section('title', 'Admin login')
@section('visual-kicker', 'Admin access')
@section('visual-title', 'Leadership training and coaching, built around your goals.')

@section('content')
    <p class="gate-kicker">Admin</p>
    <h2>Welcome back</h2>
    <p class="gate-lead">Sign in to manage courses, students, payments and academy notifications.</p>

    <form method="POST" action="{{ route('login.store') }}">
        @csrf

        <label class="gate-field">
            Email address
            <input type="email" name="email" value="{{ old('email') }}" required autofocus>
        </label>
        @error('email')
            <p class="gate-error">{{ $message }}</p>
        @enderror

        <label class="gate-field">
            Password
            @include('components.password-field', [
                'name' => 'password',
                'required' => true,
                'autocomplete' => 'current-password',
            ])
        </label>
        @error('password')
            <p class="gate-error">{{ $message }}</p>
        @enderror

        <div class="gate-toolbar">
            <label class="gate-check">
                <input type="checkbox" name="remember">
                Remember me
            </label>
            <a class="gate-forgot" href="{{ route('password.request') }}">Forgot password?</a>
        </div>

        <button class="gate-submit" type="submit">Sign in</button>
    </form>
@endsection
