<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $orders = Order::where('user_id', $user->id)
            ->with(['catering', 'chatMessages' => function ($q) {
                $q->latest()->limit(1);
            }])
            ->latest()
            ->get();

        $threads = $orders
            ->filter(fn ($o) => $o->chatMessages->isNotEmpty())
            ->map(fn ($o) => [
                'order_id' => $o->id,
                'catering' => $o->catering,
                'last_message' => $o->chatMessages->first(),
                'unread_count' => $o->chatMessages()->where('is_read', false)->count(),
            ])
            ->values();

        return Inertia::render('Messages', [
            'threads' => $threads,
        ]);
    }
}
