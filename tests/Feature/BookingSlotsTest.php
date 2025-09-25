<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class );

it('can create a booking', function () {
    $user = \App\Models\User::factory()->create();
    $slot = \App\Models\Slot::factory()->create();

    $this->assertDatabaseHas('users', ['id' => $user->id]);

    $response = $this->postJson('/api/booking', [
        'user_id' => $user->id,
        'slot_id' => $slot->id,
        'date' => now()->format('Y-m-d')
    ]);

    $response->assertStatus(201);

    $this->assertDatabaseHas('bookings', [
        'user_id' => $user->id,
        'slot_id' => $slot->id,
    ]);
});
it('cannot book the same slot for the same date twice', function () {
    $user = \App\Models\User::factory()->create();
    $slot = \App\Models\Slot::factory()->create();
    $date = now()->format('Y-m-d');

    $this->postJson('/api/booking', [
        'user_id' => $user->id,
        'slot_id' => $slot->id,
        'date' => $date
    ])->assertStatus(201);

    $response = $this->postJson('/api/booking', [
        'user_id' => $user->id,
        'slot_id' => $slot->id,
        'date' => $date
    ]);

    $response->assertStatus(422);
});
it('can list all bookings', function () {
    \App\Models\Booking::factory()->count(3)->create();

    $response = $this->getJson('/api/booking');
    $response->assertStatus(200)
        ->assertJsonCount(3, 'data');
});
