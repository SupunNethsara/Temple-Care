<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Temple extends Model
{
    protected $table = 'temples';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    protected $fillable = [
        'name',
        'location',
        'contact',
        'currency',
        'time_zone',
    ];

    protected $casts = [
        'id' => 'string',
        'contact' => 'string',
        'currency' => 'string',
        'time_zone' => 'date',
        ];

    protected static function booted()
    {
        static::creating(function ($temple) {
            if (!$temple->id) {
                $temple->id = (string) Str::uuid();
            }
        });
    }
}
