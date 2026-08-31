@extends('layouts.panel')

@section('title', 'Edit profile')
@section('eyebrow', 'Account')
@section('heading', 'Edit profile')

@section('content')
    <form class="form-card" method="POST" action="{{ route('profile.update') }}">
        @csrf
        @method('PUT')

        <label>
            Name
            <input type="text" name="name" value="{{ old('name', $user->name) }}" required>
        </label>
        @error('name') <small class="error">{{ $message }}</small> @enderror

        <label>
            Email
            <input type="email" name="email" value="{{ old('email', $user->email) }}" required>
        </label>
        @error('email') <small class="error">{{ $message }}</small> @enderror

        <label>
            Phone number
            <input type="tel" name="phone" value="{{ old('phone', $user->phone) }}" autocomplete="tel">
        </label>
        @error('phone') <small class="error">{{ $message }}</small> @enderror

        <label>
            New password
            <x-password-input minlength="8" placeholder="Leave blank to keep current password" autocomplete="new-password" />
        </label>
        @error('password') <small class="error">{{ $message }}</small> @enderror

        <label>
            Confirm password
            <x-password-input name="password_confirmation" minlength="8" autocomplete="new-password" />
        </label>

        <button class="btn" type="submit">Save profile</button>
    </form>
@endsection
