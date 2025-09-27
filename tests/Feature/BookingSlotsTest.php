<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('can create a booking', function () {
    $user = \App\Models\User::factory()->create();
    $response =$this->postJson('/api/booking',[
        'user_id'=>$user->id,
        'time_slot'=>'08:00-09:00',
        'date'=>now()->format('Y-m-d')
    ]);
    $response->assertStatus(201);

});

