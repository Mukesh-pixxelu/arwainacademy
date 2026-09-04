<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\CourseSubmission;
use App\Models\CourseUnit;
use App\Models\Payment;
use App\Models\UnitProgress;
use App\Services\AdminNotifier;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CourseWorkspaceController extends Controller
{
    public function show(Request $request, string $slug): JsonResponse
    {
        $course = $this->enrolledCourse($request, $slug);
        $course->ensureDefaultUnits();
        $course->load('units');

        return response()->json($this->workspace($request, $course));
    }

    public function completeReading(Request $request, string $slug, CourseUnit $unit): JsonResponse
    {
        $course = $this->enrolledCourse($request, $slug);
        $this->assertUnit($course, $unit);

        if (! $unit->isReading()) {
            throw ValidationException::withMessages([
                'unit' => ['This item is submitted, not marked as read.'],
            ]);
        }

        UnitProgress::query()->updateOrCreate(
            [
                'user_id' => $request->user()->id,
                'course_unit_id' => $unit->id,
            ],
            [
                'status' => 'complete',
                'completed_at' => now(),
            ]
        );

        $course->load('units');

        return response()->json($this->workspace($request, $course));
    }

    public function submit(Request $request, string $slug, CourseUnit $unit): JsonResponse
    {
        $course = $this->enrolledCourse($request, $slug);
        $this->assertUnit($course, $unit);

        if (! $unit->needsSubmission()) {
            throw ValidationException::withMessages([
                'unit' => ['This item does not need a written submission.'],
            ]);
        }

        $latest = $this->latestSubmission($request->user()->id, $unit->id);
        if ($latest && $latest->isApproved()) {
            throw ValidationException::withMessages([
                'unit' => ['This has already been signed off.'],
            ]);
        }

        if ($unit->isQuestionnaire()) {
            $data = $this->validatedQuestionnaire($request, $course);
            $payload = [
                'answers' => $data,
                'body' => null,
            ];
        } else {
            $data = $request->validate([
                'body' => ['required', 'string', 'max:20000'],
            ]);
            $payload = [
                'answers' => null,
                'body' => $data['body'],
            ];
        }

        CourseSubmission::query()->create([
            'user_id' => $request->user()->id,
            'course_id' => $course->id,
            'course_unit_id' => $unit->id,
            'answers' => $payload['answers'],
            'body' => $payload['body'],
            'status' => 'submitted',
        ]);

        AdminNotifier::push(
            'course-work',
            $request->user()->name.' submitted course work',
            $request->user()->name.' submitted “'.$unit->title.'” on '.$course->title.'.',
            [
                'user_id' => $request->user()->id,
                'course_id' => $course->id,
                'unit_id' => $unit->id,
            ],
        );

        $course->load('units');

        return response()->json($this->workspace($request, $course));
    }

    /**
     * @return array<string, mixed>
     */
    private function workspace(Request $request, Course $course): array
    {
        $userId = $request->user()->id;
        $units = $course->units;
        $progressRows = UnitProgress::query()
            ->where('user_id', $userId)
            ->whereIn('course_unit_id', $units->pluck('id'))
            ->get()
            ->keyBy('course_unit_id');
        $submissions = CourseSubmission::query()
            ->where('user_id', $userId)
            ->whereIn('course_unit_id', $units->pluck('id'))
            ->latest()
            ->get()
            ->groupBy('course_unit_id');

        $items = $units->map(function (CourseUnit $unit) use ($progressRows, $submissions) {
            $latest = $submissions->get($unit->id)?->first();
            $read = $progressRows->get($unit->id);
            $complete = $this->unitComplete($unit, $read, $latest);

            return [
                'id' => $unit->id,
                'key' => $unit->key,
                'title' => $unit->title,
                'type' => $unit->type,
                'body' => $unit->body,
                'required' => $unit->required,
                'complete' => $complete,
                'status' => $this->unitStatus($unit, $read, $latest),
                'admin_note' => $latest?->admin_note,
                'submission' => $latest ? [
                    'id' => $latest->id,
                    'status' => $latest->status,
                    'answers' => $latest->answers,
                    'body' => $latest->body,
                    'submitted_at' => optional($latest->created_at)->toIso8601String(),
                    'reviewed_at' => optional($latest->reviewed_at)->toIso8601String(),
                ] : null,
            ];
        })->values()->all();

        $total = max(count($items), 1);
        $done = count(array_filter($items, fn ($item) => $item['complete']));
        $signedOff = count(array_filter($items, fn ($item) => $item['status'] === 'approved' || ($item['type'] === 'reading' && $item['complete'])));

        return [
            'course' => [
                'id' => $course->id,
                'slug' => $course->slug,
                'title' => $course->title,
                'category' => $course->category,
                'guide_pdf_url' => $course->guide_pdf_url,
            ],
            'progress' => [
                'done' => $done,
                'total' => $total,
                'percent' => (int) round(($done / $total) * 100),
                'signed_off' => $signedOff,
            ],
            'questions' => $course->learnerQuestions(),
            'units' => $items,
        ];
    }

    private function unitComplete(CourseUnit $unit, ?UnitProgress $read, ?CourseSubmission $latest): bool
    {
        if ($unit->isReading()) {
            return (bool) $read;
        }

        return $latest && ! $latest->isReturned();
    }

    private function unitStatus(CourseUnit $unit, ?UnitProgress $read, ?CourseSubmission $latest): string
    {
        if ($unit->isReading()) {
            return $read ? 'complete' : 'todo';
        }

        if (! $latest) {
            return 'todo';
        }

        return $latest->status;
    }

    /**
     * @return array<string, string>
     */
    private function validatedQuestionnaire(Request $request, Course $course): array
    {
        $questions = $course->learnerQuestions();
        $rules = [];
        foreach ($questions as $question) {
            $id = $question['id'];
            $rules['answers.'.$id] = ! empty($question['required'])
                ? ['required', 'string', 'max:4000']
                : ['nullable', 'string', 'max:4000'];
        }

        $data = $request->validate($rules);

        return $data['answers'] ?? [];
    }

    private function latestSubmission(int $userId, int $unitId): ?CourseSubmission
    {
        return CourseSubmission::query()
            ->where('user_id', $userId)
            ->where('course_unit_id', $unitId)
            ->latest()
            ->first();
    }

    private function enrolledCourse(Request $request, string $slug): Course
    {
        $course = Course::query()->where('slug', $slug)->first();
        if (! $course) {
            abort(404, 'Course not found.');
        }

        $paid = Payment::query()
            ->with('items')
            ->where('user_id', $request->user()->id)
            ->where('status', 'successful')
            ->get()
            ->contains(function (Payment $payment) use ($course) {
                return $payment->items->contains(function ($item) use ($course) {
                    return Course::matchPurchase($item->slug, (string) $item->title, collect([$course]));
                });
            });

        if (! $paid) {
            abort(403, 'Enrol on this course to open the learning space.');
        }

        return $course;
    }

    private function assertUnit(Course $course, CourseUnit $unit): void
    {
        if ((int) $unit->course_id !== (int) $course->id) {
            abort(404);
        }
    }
}
