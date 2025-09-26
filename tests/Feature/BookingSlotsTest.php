<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('can create a booking', function () {
    $user = \App\Models\User::factory()->create();

    $this->assertDatabaseHas('users', ['id' => $user->id]);

    $response = $this->postJson('/api/booking', [
        'user_id' => $user->id,
        'time_slot' => '08:00-09:00',
        'date' => now()->format('Y-m-d')
    ]);

    $response->assertStatus(201);

    $this->assertDatabaseHas('bookings', [
        'user_id' => $user->id,
        'time_slot' => '08:00-09:00',
    ]);
});

it('cannot book the same time slot for the same date twice', function () {
    $user = \App\Models\User::factory()->create();
    $date = now()->format('Y-m-d');

    $this->postJson('/api/booking', [
        'user_id' => $user->id,
        'time_slot' => '09:00-10:00',
        'date' => $date
    ])->assertStatus(201);

    $response = $this->postJson('/api/booking', [
        'user_id' => $user->id,
        'time_slot' => '09:00-10:00',
        'date' => $date
    ]);

    $response->assertStatus(422);

});

it('can book different time slots for the same date', function () {
    $user = \App\Models\User::factory()->create();
    $date = now()->format('Y-m-d');

    $response1 = $this->postJson('/api/booking', [
        'user_id' => $user->id,
        'time_slot' => '10:00-11:00',
        'date' => $date
    ]);
    $response1->assertStatus(201);

    $response2 = $this->postJson('/api/booking', [
        'user_id' => $user->id,
        'time_slot' => '14:00-15:00',
        'date' => $date
    ]);
    $response2->assertStatus(201);

    $this->assertDatabaseCount('bookings', 2);
});

it('can book same time slot for different dates', function () {
    $user = \App\Models\User::factory()->create();

    $response1 = $this->postJson('/api/booking', [
        'user_id' => $user->id,
        'time_slot' => '08:00-09:00',
        'date' => now()->format('Y-m-d')
    ]);
    $response1->assertStatus(201);


    $response2 = $this->postJson('/api/booking', [
        'user_id' => $user->id,
        'time_slot' => '08:00-09:00',
        'date' => now()->addDay()->format('Y-m-d')
    ]);
    $response2->assertStatus(201);

    $this->assertDatabaseCount('bookings', 2);
});

it('can list all bookings', function () {
    \App\Models\Booking::factory()->count(3)->create();

    $response = $this->getJson('/api/booking');
    $response->assertStatus(200)
        ->assertJsonCount(3, 'data');
});

it('validates booking request data', function () {
    $response = $this->postJson('/api/booking', [
        'user_id' => 'invalid-uuid',
        'time_slot' => 'invalid-slot',
        'date' => 'invalid-date'
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['user_id', 'time_slot', 'date']);
});

it('prevents booking for past dates', function () {
    $user = \App\Models\User::factory()->create();
    $pastDate = now()->subDay()->format('Y-m-d');

    $response = $this->postJson('/api/booking', [
        'user_id' => $user->id,
        'time_slot' => '08:00-09:00',
        'date' => $pastDate
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['date']);
});

it('validates time slot format', function () {
    $user = \App\Models\User::factory()->create();

    $response = $this->postJson('/api/booking', [
        'user_id' => $user->id,
        'time_slot' => '25:00-26:00',
        'date' => now()->format('Y-m-d')
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['time_slot']);
});


it('can get available slots for a date', function () {
    $user = \App\Models\User::factory()->create();
    $date = now()->format('Y-m-d');

    $this->postJson('/api/booking', [
        'user_id' => $user->id,
        'time_slot' => '09:00-10:00',
        'date' => $date
    ])->assertStatus(201);

    $response = $this->getJson("/api/available-slots?date={$date}");

    $response->assertStatus(200)
        ->assertJsonStructure([
            'date',
            'available_slots',
            'booked_slots'
        ]);
});
