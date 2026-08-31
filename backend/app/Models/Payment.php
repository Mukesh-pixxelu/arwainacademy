<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['user_id', 'method', 'plan', 'amount', 'status', 'phone', 'reference', 'paid_at'])]
class Payment extends Model
{
    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'paid_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(PaymentItem::class);
    }

    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    public function isSuccessful(): bool
    {
        return $this->status === 'successful';
    }

    public function methodLabel(): string
    {
        return $this->method === 'paypal' ? 'PayPal' : 'Stripe';
    }

    public function courseList(): string
    {
        $titles = $this->items->pluck('title')->filter()->all();

        return $titles ? implode(', ', $titles) : 'Course';
    }

    public function planLabel(): string
    {
        return match ($this->plan) {
            '3' => '3 months',
            '6' => '6 months',
            '12' => '12 months',
            '24' => '24 months',
            default => 'Pay in full',
        };
    }

    public function markSuccessful(?string $reference = null): void
    {
        $this->forceFill([
            'status' => 'successful',
            'paid_at' => $this->paid_at ?? now(),
            'reference' => $reference ?: $this->reference,
        ])->save();
    }
}
