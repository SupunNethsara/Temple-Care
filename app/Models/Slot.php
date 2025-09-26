<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Slot extends Model
{
    use HasFactory;

    protected $fillable = ['slot_name', 'start_time', 'end_time'];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
