<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'user_id',
        'time_slot',
        'date',
    ];

    protected $casts = [
        'id' => 'string',
        'user_id' => 'string',
        'date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function slot()
    {
        return $this->belongsTo(Slot::class);
    }
}
