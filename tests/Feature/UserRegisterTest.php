<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('can register a user', function () {
    $response = $this->postJson('/api/register', [
        'name' => 'Supun Nethsara',
        'email' => 'supun@example.com',
        'phone' => '0771234567',
        'role' => 'admin',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ]);
    $response->assertStatus(201)
        ->assertJsonStructure([
            'user' => ['id', 'name', 'email', 'phone', 'role'],
        ]);
    $this->assertDatabaseHas('users', [
        'email' => 'supun@example.com',
        'phone' => '0771234567',
        'role' => 'admin',
    ]);
});
