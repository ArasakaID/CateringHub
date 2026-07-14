<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Http;

class ChatMessage extends Model
{
    protected $fillable = [
        'order_id', 'sender_type', 'message', 'is_read',
    ];

    protected function casts(): array
    {
        return [
            'is_read' => 'boolean',
        ];
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function scopeUnread($query)
    {
        return $query->where('is_read', false);
    }

    protected static function booted(): void
    {
        static::created(function (ChatMessage $msg) {
            if ($msg->sender_type !== 'courier') {
                return;
            }

            $groqKey = env('GROQ_API_KEY');
            if (!$groqKey) {
                return;
            }

            $order = $msg->order;
            if (!$order) {
                return;
            }

            $recent = $order->chatMessages()->latest()->take(10)->get()->reverse();

            $history = [];
            foreach ($recent as $m) {
                $history[] = [
                    'role' => $m->sender_type === 'courier' ? 'assistant' : 'user',
                    'content' => $m->message,
                ];
            }

            try {
                $response = Http::withOptions(['verify' => false])
                    ->withHeaders([
                        'Authorization' => 'Bearer ' . $groqKey,
                        'Content-Type' => 'application/json',
                    ])->timeout(15)->post('https://api.groq.com/openai/v1/chat/completions', [
                        'model' => 'llama-3.3-70b-versatile',
                        'messages' => array_merge([
                            ['role' => 'system', 'content' => 'Kamu adalah pembeli catering. Balas pesan kurir dengan singkat, sopan, dan natural dalam Bahasa Indonesia. Maksimal 2 kalimat.'],
                        ], $history),
                        'max_tokens' => 100,
                    ]);

                if ($response->successful()) {
                    $reply = $response->json('choices.0.message.content');
                    if ($reply) {
                        $order->chatMessages()->create([
                            'sender_type' => 'user',
                            'message' => trim($reply),
                            'is_read' => false,
                        ]);
                    }
                }
            } catch (\Exception $e) {
                // Silently fail — don't block message creation
            }
        });
    }
}
