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

            \Illuminate\Support\Facades\Log::info('Auto-reply triggered for message: ' . $msg->id);

            $groqKey = config('services.groq.api_key');
            if (!$groqKey) {
                \Illuminate\Support\Facades\Log::warning('GROQ_API_KEY not set in config/services.php');
                return;
            }

            $order = $msg->order;
            if (!$order) {
                \Illuminate\Support\Facades\Log::warning('Order not found for message: ' . $msg->id);
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
                        $saved = $order->chatMessages()->create([
                            'sender_type' => 'user',
                            'message' => trim($reply),
                            'is_read' => false,
                        ]);
                        \Illuminate\Support\Facades\Log::info('Auto-reply saved: ' . $saved->id);
                    } else {
                        \Illuminate\Support\Facades\Log::warning('Groq returned empty reply');
                    }
                } else {
                    \Illuminate\Support\Facades\Log::error('Groq API failed: ' . $response->status() . ' - ' . $response->body());
                }
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error('Auto-reply exception: ' . $e->getMessage());
            }
        });
    }
}
