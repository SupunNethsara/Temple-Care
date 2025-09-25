<?php

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

it('can create a booking', function () {
    $user = \App\Models\User::factory()->create();
    $slot = \App\Models\Slot::factory()->create();

    $response = $this->postJson('/api/booking', [
        'user_id' => $user->id,
        'slot_id' => $slot->id,
        'date' => now()->format('Y-m-d')
    ]);

    $response->assertStatus(201);
});

