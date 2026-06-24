<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Menu extends Model
{
    protected $fillable = [
        'catering_id', 'category_id', 'name', 'description',
        'price', 'image', 'options', 'is_available',
    ];

    protected $casts = [
        'options' => 'array',
        'price' => 'decimal:2',
    ];

    public function catering(): BelongsTo
    {
        return $this->belongsTo(Catering::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function scopeAvailable($query)
    {
        return $query->where('is_available', true);
    }
}
