<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

#[Fillable(['title', 'slug', 'image', 'description', 'price', 'category'])]
class Course extends Model
{
    /** @use HasFactory<\Database\Factories\CourseFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
        ];
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
