<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = [
        'user_id', 'catering_id', 'order_number', 'subtotal',
        'delivery_fee', 'total', 'status', 'notes',
        'delivery_address', 'phone',
        'payment_method', 'payment_status', 'paid_at',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function catering(): BelongsTo
    {
        return $this->belongsTo(Catering::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function couriers(): BelongsToMany
    {
        return $this->belongsToMany(Courier::class, 'order_courier')
            ->withPivot(['assigned_at', 'status'])
            ->withTimestamps();
    }

    public function trackingLogs(): HasMany
    {
        return $this->hasMany(OrderTrackingLog::class)->orderBy('created_at');
    }

    public function chatMessages(): HasMany
    {
        return $this->hasMany(ChatMessage::class)->orderBy('created_at');
    }

    public function courier(): ?Courier
    {
        return $this->couriers()->first();
    }
}
