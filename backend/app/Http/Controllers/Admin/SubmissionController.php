<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CourseSubmission;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class SubmissionController extends Controller
{
    public function index(Request $request): View
    {
        $status = trim((string) $request->query('status', 'submitted'));

        $query = CourseSubmission::query()
            ->with(['user', 'course', 'unit'])
            ->latest();

        if ($status !== '' && $status !== 'all') {
            $query->where('status', $status);
        }

        $submissions = $query->paginate(30)->withQueryString();
        $pending = CourseSubmission::query()->where('status', 'submitted')->count();

        return view('admin.submissions.index', compact('submissions', 'status', 'pending'));
    }

    public function show(CourseSubmission $submission): View
    {
        $submission->load(['user', 'course', 'unit', 'reviewer']);
        $questions = collect($submission->course?->learnerQuestions() ?? config('learner_questionnaire', []))->keyBy('id');

        return view('admin.submissions.show', compact('submission', 'questions'));
    }

    public function review(Request $request, CourseSubmission $submission): RedirectResponse
    {
        $data = $request->validate([
            'status' => ['required', 'in:approved,returned'],
            'admin_note' => ['nullable', 'string', 'max:2000'],
        ]);

        $submission->update([
            'status' => $data['status'],
            'admin_note' => $data['admin_note'] ?? null,
            'reviewed_by' => $request->user()->id,
            'reviewed_at' => now(),
        ]);

        $label = $data['status'] === 'approved' ? 'signed off' : 'returned for changes';

        return back()->with('success', 'Submission '.$label.'.');
    }
}
