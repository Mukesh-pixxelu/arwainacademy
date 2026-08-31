@props([
    'name' => 'password',
    'required' => false,
    'minlength' => null,
    'placeholder' => '',
    'autocomplete' => 'current-password',
])

<span class="password-wrap">
    <input
        type="password"
        name="{{ $name }}"
        @if($required) required @endif
        @if($minlength) minlength="{{ $minlength }}" @endif
        placeholder="{{ $placeholder }}"
        autocomplete="{{ $autocomplete }}"
    >
    <button type="button" class="password-eye" data-toggle-password aria-label="Show password">
        <svg class="eye-on" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>
        <svg class="eye-off" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M10.6 10.6A2 2 0 0 0 12 14a2 2 0 0 0 1.4-.6M9.9 5.1A10 10 0 0 1 12 5c5 0 9 4 10 7-.3.8-1 1.9-1.9 2.9M6.1 6.1C4.2 7.5 2.8 9.4 2 12c1 3 5 7 10 7 1.3 0 2.5-.3 3.6-.8"/></svg>
    </button>
</span>
