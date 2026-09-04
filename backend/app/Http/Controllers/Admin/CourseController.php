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
        return view('admin.courses.create', ['course' => new Course]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        unset($data['image'], $data['guide_pdf'], $data['questions']);
        $data['slug'] = Course::makeSlug($data['title']);
        $data['image'] = $this->storeImage($request);
        $data['listed'] = $request->boolean('listed');
        $data['questions'] = $this->questionList($request);
        $data['guide_pdf'] = $this->storePdf($request);

        $course = Course::create($data);
        $course->ensureDefaultUnits();

        return redirect()
            ->route('admin.courses.edit', $course)
            ->with('success', 'Course added. Upload a PDF and add 5 questions if needed.');
    }

    public function edit(Course $course): View
    {
        $course->ensureDefaultUnits();
        $course->load('units');

        return view('admin.courses.edit', compact('course'));
    }

    public function update(Request $request, Course $course): RedirectResponse
    {
        $data = $this->validated($request, false);
        unset($data['image'], $data['guide_pdf'], $data['questions']);
        $data['listed'] = $request->boolean('listed');
        $data['questions'] = $this->questionList($request);

        if ($course->title !== $data['title']) {
            $data['slug'] = Course::makeSlug($data['title'], $course->id);
        }

        if ($request->hasFile('image')) {
            $this->deleteFile($course->image);
            $data['image'] = $this->storeImage($request);
        }

        if ($request->hasFile('guide_pdf')) {
            $this->deleteFile($course->guide_pdf);
            $data['guide_pdf'] = $this->storePdf($request);
        }

        $course->update($data);
        $course->ensureDefaultUnits();

        return redirect()
            ->route('admin.courses.edit', $course)
            ->with('success', 'Course updated.');
    }

    public function destroy(Course $course): RedirectResponse
    {
        $this->deleteFile($course->image);
        $this->deleteFile($course->guide_pdf);
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
            'image' => ['nullable', 'image', 'max:2048'],
            'guide_pdf' => ['nullable', 'file', 'mimes:pdf', 'max:10240'],
            'questions' => ['nullable', 'array', 'max:5'],
            'questions.*' => ['nullable', 'string', 'max:500'],
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

    private function storePdf(Request $request): ?string
    {
        if (! $request->hasFile('guide_pdf')) {
            return null;
        }

        $directory = public_path('uploads/courses');
        File::ensureDirectoryExists($directory);

        $file = $request->file('guide_pdf');
        $name = uniqid('course_pdf_', true).'.pdf';
        $file->move($directory, $name);

        return 'uploads/courses/'.$name;
    }

    /**
     * @return list<array{id: string, label: string, type: string, required: bool}>
     */
    private function questionList(Request $request): array
    {
        $items = [];
        foreach ($request->input('questions', []) as $index => $label) {
            $text = trim((string) $label);
            if ($text === '') {
                continue;
            }
            $items[] = [
                'id' => 'q'.((int) $index + 1),
                'label' => $text,
                'type' => 'textarea',
                'required' => true,
            ];
        }

        return $items;
    }

    private function deleteFile(?string $path): void
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
