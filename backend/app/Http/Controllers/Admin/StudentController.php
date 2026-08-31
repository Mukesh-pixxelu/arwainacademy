<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class StudentController extends Controller
{
    public function index(Request $request): View
    {
        $search = trim((string) $request->query('q', ''));
        $when = trim((string) $request->query('when', ''));

        $base = User::query()->where('role', 'student');
        $totalStudents = (clone $base)->count();
        $monthStudents = (clone $base)
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();
        $weekStudents = (clone $base)
            ->where('created_at', '>=', now()->startOfWeek())
            ->count();

        $students = User::query()
            ->where('role', 'student')
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($inner) use ($search) {
                    $inner->where('name', 'like', '%'.$search.'%')
                        ->orWhere('email', 'like', '%'.$search.'%')
                        ->orWhere('phone', 'like', '%'.$search.'%');
                });
            })
            ->when($when === 'month', function ($query) {
                $query->whereMonth('created_at', now()->month)
                    ->whereYear('created_at', now()->year);
            })
            ->when($when === 'week', function ($query) {
                $query->where('created_at', '>=', now()->startOfWeek());
            })
            ->orderByDesc('created_at')
            ->get();

        return view('admin.students.index', compact(
            'students',
            'search',
            'when',
            'totalStudents',
            'monthStudents',
            'weekStudents',
        ));
    }

    public function show(User $user): View|RedirectResponse
    {
        if (! $user->isStudent()) {
            return redirect()->route('admin.students.index');
        }

        $student = $user;
        $payments = $user->payments()->with('items')->latest()->get();

        return view('admin.students.show', compact('student', 'payments'));
    }

    public function destroy(User $user): RedirectResponse
    {
        if (! $user->isStudent()) {
            return back()->with('error', 'Only students can be removed here.');
        }

        $user->delete();

        return redirect()
            ->route('admin.students.index')
            ->with('success', 'Student removed.');
    }
}
