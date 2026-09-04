<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\JsonResponse;

class CatalogController extends Controller
{
    public function index(): JsonResponse
    {
        $courses = Course::query()
            ->where('listed', true)
            ->orderByRaw("CASE category WHEN 'Level 3' THEN 1 WHEN 'Level 5' THEN 2 WHEN 'Level 7' THEN 3 WHEN 'Coaching' THEN 4 ELSE 5 END")
            ->orderBy('title')
            ->get()
            ->map(fn (Course $course) => $this->payload($course));

        return response()->json(['courses' => $courses]);
    }

    public function show(string $slug): JsonResponse
    {
        $course = Course::query()->where('listed', true)->where('slug', $slug)->first();

        if (! $course) {
            return response()->json(['message' => 'Course not found.'], 404);
        }

        return response()->json(['course' => $this->payload($course)]);
    }

    /**
     * @return array<string, mixed>
     */
    private function payload(Course $course): array
    {
        return [
            'id' => $course->id,
            'slug' => $course->slug,
            'title' => $course->title,
            'category' => $course->category,
            'price' => (float) $course->price,
            'description' => $course->description,
            'image' => $course->image,
            'image_url' => $course->image_url,
        ];
    }
}
