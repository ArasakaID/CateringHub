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
            if ($msg->sender_type !== 'user') {
                return;
            }

            $groqKey = config('services.groq.api_key');
            if (!$groqKey) {
                return;
            }

            $order = $msg->order;
            if (!$order) {
                return;
            }

            // Load relations for context
            $order->loadMissing(['catering', 'couriers']);
            $courier = $order->courier();
            $cateringName = $order->catering?->name ?? 'Catering';
            $driverName = $courier?->name ?? 'Kurir';
            $statusLabel = match ($order->status) {
                'confirmed' => 'pesanan dikonfirmasi, sedang dipersiapkan',
                'preparing' => 'sedang dimasak',
                'picked_up' => 'sedang dalam perjalanan',
                'arriving_soon' => 'akan segera tiba',
                'delivered', 'completed' => 'sudah diantar',
                default => 'dalam proses',
            };
            $eta = in_array($order->status, ['picked_up', 'arriving_soon']) ? '20 menit' : 'sedang diproses';

            $systemContext = "Kamu adalah {$driverName}, kurir pengiriman dari {$cateringName}. "
                . "Status pesanan: {$statusLabel}. "
                . "Estimasi waktu: {$eta}. "
                . "Balas pesan pembeli dengan singkat, sopan, dan natural dalam Bahasa Indonesia sebagai seorang kurir. Maksimal 2 kalimat.";

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
                            ['role' => 'system', 'content' => $systemContext],
                        ], $history),
                        'max_tokens' => 100,
                    ]);

                if ($response->successful()) {
                    $reply = $response->json('choices.0.message.content');
                    if ($reply) {
                        $saved = $order->chatMessages()->create([
                            'sender_type' => 'courier',
                            'message' => trim($reply),
                            'is_read' => true,
                        ]);
                        \Illuminate\Support\Facades\Log::info('AI driver reply saved: ' . $saved->id);
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
