<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['course_id', 'key', 'title', 'type', 'sort_order', 'body', 'required'])]
class CourseUnit extends Model
{
    protected function casts(): array
    {
        return [
            'required' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function progress(): HasMany
    {
        return $this->hasMany(UnitProgress::class);
    }

    public function submissions(): HasMany
    {
        return $this->hasMany(CourseSubmission::class);
    }

    public function isReading(): bool
    {
        return $this->type === 'reading';
    }

    public function isQuestionnaire(): bool
    {
        return $this->type === 'questionnaire';
    }

    public function needsSubmission(): bool
    {
        return in_array($this->type, ['questionnaire', 'assignment'], true);
    }
}
