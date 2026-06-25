<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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
}
