<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['type', 'title', 'body', 'meta', 'read_at'])]
class AdminNotification extends Model
{
    protected function casts(): array
    {
        return [
            'meta' => 'array',
            'read_at' => 'datetime',
        ];
    }

    public function isUnread(): bool
    {
        return $this->read_at === null;
    }
}
