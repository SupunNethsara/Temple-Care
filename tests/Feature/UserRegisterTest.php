<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;

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
it('fails to register a user with invalid data', function () {
    $response = $this->postJson('/api/register', [
        'name' => '',
        'email' => 'not-an-email',
        'phone' => '',
        'role' => '',
        'password' => '123',
        'password_confirmation' => '456',
    ]);

    $response->assertStatus(422)
    ->assertJsonValidationErrors([
        'name',
        'email',
        'phone',
        'role',
        'password',
    ]);
});
it('can login a registered user ', function () {
     User::create([
        'name' => 'Supun Nethsara',
        'email' => 'supun@example.com',
        'phone' => '0771234567',
        'role' => 'admin',
        'password' => Hash::make('password123'),
    ]);
    $response = $this->postJson('/api/login',[
        'email' => 'supun@example.com',
        'password' => 'password123',
    ]);
    $response->assertStatus(200)
        ->assertJsonStructure([
            'user' => ['id', 'name', 'email', 'phone', 'role'],
            'token',
        ]);
});
