<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Booking extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'slot_id',
        'time_slot', // Keep for convenience, but slot_id is primary
        'date'
    ];

    protected $casts = [
        'date' => 'date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function slot()
    {
        return $this->belongsTo(Slot::class);
    }

    // Scope to check availability
    public function scopeAvailable($query, $slotId, $date)
    {
        return $query->where('slot_id', $slotId)
            ->where('date', $date)
            ->doesntExist();
    }
}
