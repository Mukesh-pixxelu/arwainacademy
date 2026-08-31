<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json($this->payload());
    }

    public function markRead(): JsonResponse
    {
        AdminNotification::query()
            ->whereNull('read_at')
            ->update(['read_at' => now()]);

        return response()->json($this->payload());
    }

    public function destroy(Request $request, AdminNotification $notification): JsonResponse|RedirectResponse
    {
        $notification->delete();

        if ($request->wantsJson()) {
            return response()->json($this->payload());
        }

        return back()->with('success', 'Notification deleted.');
    }

    public function destroyAll(Request $request): JsonResponse|RedirectResponse
    {
        AdminNotification::query()->delete();

        if ($request->wantsJson()) {
            return response()->json($this->payload());
        }

        return back()->with('success', 'All notifications deleted.');
    }

    private function payload(): array
    {
        $items = AdminNotification::query()
            ->latest()
            ->take(12)
            ->get()
            ->map(fn (AdminNotification $n) => [
                'id' => $n->id,
                'type' => $n->type,
                'title' => $n->title,
                'body' => $n->body,
                'unread' => $n->isUnread(),
                'when' => $n->created_at?->diffForHumans(),
            ]);

        return [
            'unread' => AdminNotification::query()->whereNull('read_at')->count(),
            'items' => $items,
        ];
    }
}
