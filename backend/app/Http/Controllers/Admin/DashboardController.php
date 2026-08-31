<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminNotification;
use App\Models\Course;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function __invoke(): View
    {
        $studentCount = User::query()->where('role', 'student')->count();
        $courseCount = Course::query()->count();
        $avgPrice = round((float) Course::query()->avg('price'), 2);
        $monthStudents = User::query()
            ->where('role', 'student')
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();
        $freeCourses = Course::query()->where('price', 0)->count();
        $paidCourses = $courseCount - $freeCourses;

        $categoryRows = Course::query()
            ->select('category', DB::raw('count(*) as total'))
            ->groupBy('category')
            ->get();

        $pieLabels = $categoryRows->map(fn ($row) => $row->category ?: 'Uncategorised')->values()->all();
        $pieData = $categoryRows->pluck('total')->map(fn ($n) => (int) $n)->values()->all();
        $studentBars = [];
        $courseBars = [];
        $barLabels = [];

        for ($i = 5; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $barLabels[] = $date->format('M');
            $studentBars[] = (int) User::query()
                ->where('role', 'student')
                ->whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->count();
            $courseBars[] = (int) Course::query()
                ->whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->count();
        }

        $latestStudents = User::query()
            ->where('role', 'student')
            ->latest()
            ->take(6)
            ->get();

        $monthShare = $studentCount > 0
            ? round(($monthStudents / $studentCount) * 100)
            : 0;

        $latestPayments = Payment::query()
            ->with(['user', 'items'])
            ->latest()
            ->take(100)
            ->get();
        $pendingPayments = Payment::query()->where('status', 'pending')->count();
        $successfulPayments = Payment::query()->where('status', 'successful')->count();
        $revenue = (float) Payment::query()->where('status', 'successful')->sum('amount');
        $latestNotifications = AdminNotification::query()->latest()->take(8)->get();

        return view('admin.dashboard', compact(
            'studentCount',
            'courseCount',
            'avgPrice',
            'monthStudents',
            'freeCourses',
            'paidCourses',
            'pieLabels',
            'pieData',
            'barLabels',
            'studentBars',
            'courseBars',
            'latestStudents',
            'monthShare',
            'latestPayments',
            'pendingPayments',
            'successfulPayments',
            'revenue',
            'latestNotifications',
        ));
    }
}
