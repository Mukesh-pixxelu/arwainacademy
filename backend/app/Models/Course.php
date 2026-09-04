<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

#[Fillable(['title', 'slug', 'image', 'guide_pdf', 'questions', 'description', 'price', 'category', 'listed'])]
class Course extends Model
{
    /** @use HasFactory<\Database\Factories\CourseFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'listed' => 'boolean',
            'questions' => 'array',
        ];
    }

    public function units(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(CourseUnit::class)->orderBy('sort_order')->orderBy('id');
    }

    public function ensureDefaultUnits(): void
    {
        if ($this->units()->exists()) {
            return;
        }

        $this->units()->create([
            'key' => 'guide',
            'title' => 'Course guide',
            'type' => 'reading',
            'sort_order' => 1,
            'body' => $this->description,
            'required' => true,
        ]);

        $this->units()->create([
            'key' => 'questionnaire',
            'title' => 'Initial questionnaire',
            'type' => 'questionnaire',
            'sort_order' => 2,
            'body' => 'Please answer these questions so your tutor can sign off your starting point.',
            'required' => true,
        ]);
    }

    protected function imageUrl(): Attribute
    {
        return Attribute::get(function () {
            if (! $this->image) {
                return asset('images/course-placeholder.svg');
            }

            if (str_starts_with($this->image, 'http://') || str_starts_with($this->image, 'https://')) {
                return $this->image;
            }

            return asset($this->image);
        });
    }

    protected function guidePdfUrl(): Attribute
    {
        return Attribute::get(function () {
            if (! $this->guide_pdf) {
                return null;
            }

            if (str_starts_with($this->guide_pdf, 'http://') || str_starts_with($this->guide_pdf, 'https://')) {
                return $this->guide_pdf;
            }

            return asset($this->guide_pdf);
        });
    }

    /**
     * @return list<array{id: string, label: string, type: string, required: bool}>
     */
    public function learnerQuestions(): array
    {
        $custom = collect($this->questions ?? [])
            ->map(function ($question, $index) {
                $label = is_string($question) ? $question : (string) ($question['label'] ?? '');
                $label = trim($label);
                if ($label === '') {
                    return null;
                }

                return [
                    'id' => is_array($question) && ! empty($question['id'])
                        ? (string) $question['id']
                        : 'q'.($index + 1),
                    'label' => $label,
                    'type' => is_array($question) ? (string) ($question['type'] ?? 'textarea') : 'textarea',
                    'required' => is_array($question) ? (bool) ($question['required'] ?? true) : true,
                ];
            })
            ->filter()
            ->values();

        if ($custom->isNotEmpty()) {
            return $custom->all();
        }

        return config('learner_questionnaire', []);
    }

    public static function makeSlug(string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug($title) ?: 'course';
        $slug = $base;
        $i = 2;

        while (
            static::query()
                ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
                ->where('slug', $slug)
                ->exists()
        ) {
            $slug = $base.'-'.$i;
            $i++;
        }

        return $slug;
    }

    public static function matchPurchase(?string $slug, string $title, $catalog = null): ?self
    {
        $catalog = $catalog ?? static::query()->get();
        $title = trim($title);

        if ($slug) {
            $exact = $catalog->firstWhere('slug', $slug);
            if ($exact) {
                return $exact;
            }
        }

        if ($title === '') {
            return null;
        }

        $needle = mb_strtolower($title);
        $exactTitle = $catalog->first(fn (self $course) => mb_strtolower($course->title) === $needle);
        if ($exactTitle) {
            return $exactTitle;
        }

        return $catalog->first(function (self $course) use ($needle) {
            $hay = mb_strtolower($course->title);

            return str_contains($hay, $needle) || str_contains($needle, $hay);
        });
    }
}
