@props([
    'action',
    'confirm' => 'Delete this item?',
    'label' => 'Delete',
])

<form method="POST" action="{{ $action }}" class="delete-form" onsubmit="return confirm(@js($confirm))">
    @csrf
    @method('DELETE')
    <button type="submit" {{ $attributes }}>{{ $label }}</button>
</form>
