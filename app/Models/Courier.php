<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Courier extends Model
{
    protected $fillable = [
        'name', 'phone', 'photo', 'vehicle_type', 'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public function orders(): BelongsToMany
    {
        return $this->belongsToMany(Order::class, 'order_courier')
            ->withPivot(['assigned_at', 'status'])
            ->withTimestamps();
    }
}
