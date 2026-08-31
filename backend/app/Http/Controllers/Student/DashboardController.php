<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Payment;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function __invoke(): View|RedirectResponse
    {
        if (auth()->user()->isAdmin()) {
            return redirect()->route('admin.dashboard');
        }

        $courses = Course::query()->latest()->take(6)->get();
        $payments = Payment::query()
            ->with('items')
            ->where('user_id', auth()->id())
            ->latest()
            ->take(8)
            ->get();

        return view('student.dashboard', compact('courses', 'payments'));
    }
}
