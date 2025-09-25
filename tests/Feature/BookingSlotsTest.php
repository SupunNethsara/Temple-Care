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
