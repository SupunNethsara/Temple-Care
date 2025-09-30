<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Slot extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'time_slot',
        'start_time',
        'end_time'
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
