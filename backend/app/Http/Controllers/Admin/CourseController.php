<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\View\View;

class CourseController extends Controller
{
    public function index(Request $request): View
    {
        $search = trim((string) $request->query('q', ''));
        $category = trim((string) $request->query('category', ''));

        $query = Course::query()->latest();

        if ($search !== '') {
            $query->where(function ($builder) use ($search) {
                $builder->where('title', 'like', '%'.$search.'%')
                    ->orWhere('description', 'like', '%'.$search.'%')
                    ->orWhere('category', 'like', '%'.$search.'%');
            });
        }

        if ($category !== '') {
            $query->where('category', $category);
        }

        $courses = $query->paginate(24)->withQueryString();
        $categories = Course::query()
            ->whereNotNull('category')
            ->where('category', '!=', '')
            ->distinct()
            ->orderBy('category')
            ->pluck('category');
        $totalCourses = Course::query()->count();
        $categoryCounts = Course::query()
            ->selectRaw('category, count(*) as total')
            ->whereNotNull('category')
            ->where('category', '!=', '')
            ->groupBy('category')
            ->pluck('total', 'category');

        return view('admin.courses.index', compact(
            'courses',
            'categories',
            'search',
            'category',
            'totalCourses',
            'categoryCounts',
        ));
    }

    public function create(): View
    {
        return view('admin.courses.create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $data['slug'] = Course::makeSlug($data['title']);
        $data['image'] = $this->storeImage($request);

        Course::create($data);

        return redirect()
            ->route('admin.courses.index')
            ->with('success', 'Course added successfully.');
    }

    public function edit(Course $course): View
    {
        return view('admin.courses.edit', compact('course'));
    }

    public function update(Request $request, Course $course): RedirectResponse
    {
        $data = $this->validated($request, false);

        if ($course->title !== $data['title']) {
            $data['slug'] = Course::makeSlug($data['title'], $course->id);
        }

        if ($request->hasFile('image')) {
            $this->deleteImage($course->image);
            $data['image'] = $this->storeImage($request);
        }

        $course->update($data);

        return redirect()
            ->route('admin.courses.index')
            ->with('success', 'Course updated successfully.');
    }

    public function destroy(Course $course): RedirectResponse
    {
        $this->deleteImage($course->image);
        $course->delete();

        return redirect()
            ->route('admin.courses.index')
            ->with('success', 'Course deleted.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request, bool $imageRequired = true): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'category' => ['nullable', 'string', 'max:80'],
            'image' => [$imageRequired ? 'nullable' : 'nullable', 'image', 'max:2048'],
        ]);
    }

    private function storeImage(Request $request): ?string
    {
        if (! $request->hasFile('image')) {
            return null;
        }

        $directory = public_path('uploads/courses');
        File::ensureDirectoryExists($directory);

        $file = $request->file('image');
        $name = uniqid('course_', true).'.'.$file->getClientOriginalExtension();
        $file->move($directory, $name);

        return 'uploads/courses/'.$name;
    }

    private function deleteImage(?string $path): void
    {
        if (! $path || str_starts_with($path, 'http')) {
            return;
        }

        $full = public_path($path);
        if (is_file($full)) {
            unlink($full);
        }
    }
}
