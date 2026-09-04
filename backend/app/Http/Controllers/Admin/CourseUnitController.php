<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\CourseUnit;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CourseUnitController extends Controller
{
    public function store(Request $request, Course $course): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:180'],
            'type' => ['required', 'in:reading,assignment,questionnaire'],
            'body' => ['nullable', 'string'],
        ]);

        $sort = ((int) $course->units()->max('sort_order')) + 1;

        $course->units()->create([
            'title' => $data['title'],
            'type' => $data['type'],
            'body' => $data['body'] ?? null,
            'sort_order' => $sort,
            'required' => true,
        ]);

        return back()->with('success', 'Unit added. Student progress will include this item.');
    }

    public function destroy(Course $course, CourseUnit $unit): RedirectResponse
    {
        if ((int) $unit->course_id !== (int) $course->id) {
            abort(404);
        }

        $unit->delete();

        return back()->with('success', 'Unit removed.');
    }
}
