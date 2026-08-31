<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Services\AdminNotifier;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class PaymentController extends Controller
{
    public function index(Request $request): View
    {
        $search = trim((string) $request->query('q', ''));
        $status = trim((string) $request->query('status', ''));

        $base = Payment::query();
        $totalPayments = (clone $base)->count();
        $successfulCount = (clone $base)->where('status', 'successful')->count();
        $pendingCount = (clone $base)->where('status', 'pending')->count();
        $revenue = (float) (clone $base)->where('status', 'successful')->sum('amount');

        $payments = Payment::query()
            ->with(['user', 'items'])
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($inner) use ($search) {
                    $inner->whereHas('user', function ($user) use ($search) {
                        $user->where('name', 'like', '%'.$search.'%')
                            ->orWhere('email', 'like', '%'.$search.'%');
                    })->orWhereHas('items', function ($item) use ($search) {
                        $item->where('title', 'like', '%'.$search.'%');
                    });
                });
            })
            ->when(in_array($status, ['pending', 'successful'], true), function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->latest()
            ->get();

        return view('admin.payments.index', compact(
            'payments',
            'search',
            'status',
            'totalPayments',
            'successfulCount',
            'pendingCount',
            'revenue',
        ));
    }

    public function complete(Payment $payment): RedirectResponse
    {
        if ($payment->isPending()) {
            $payment->markSuccessful();
            $payment->load(['user', 'items']);
            AdminNotifier::paymentUpdate($payment);
        }

        return back()->with('success', 'Payment marked as successful.');
    }

    public function destroy(Payment $payment): RedirectResponse
    {
        $payment->delete();

        return back()->with('success', 'Payment deleted.');
    }
}
