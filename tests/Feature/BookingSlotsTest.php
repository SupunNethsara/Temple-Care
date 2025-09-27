<?php

use App\Models\User;
use App\Models\Slot;
use App\Models\Booking;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('can create a booking', function () {
    $user = User::factory()->create();
    $slot = Slot::factory()->create([
        'time_slot' => '08:00-09:00'
    ]);

    $bookingData = [
        'user_id' => $user->id,
        'time_slot' => $slot->time_slot,
        'date' => now()->addDays(1)->format('Y-m-d')
    ];

    $response = $this->postJson('/api/bookings', $bookingData);

    $response->assertStatus(201)
        ->assertJson([
            'message' => 'Booking created successfully'
        ]);

    $this->assertDatabaseHas('bookings', [
        'user_id' => $user->id,
        'slot_id' => $slot->id,
        'date' => $bookingData['date'] . ' 00:00:00'
    ]);
});

it('lists available slots for a date', function () {
    $slot1 = Slot::factory()->create(['time_slot' => '08:00-09:00']);
    $slot2 = Slot::factory()->create(['time_slot' => '09:00-10:00']);
    $user = User::factory()->create();
    $date = now()->addDays(1)->format('Y-m-d');

    Booking::create([
        'user_id' => $user->id,
        'slot_id' => $slot1->id,
        'time_slot' => $slot1->time_slot,
        'date' => $date
    ]);

    $response = $this->getJson("/api/bookings?date={$date}");

    $response->assertStatus(200)
        ->assertJsonStructure([
            'bookings',
            'available_slots'
        ]);
});
