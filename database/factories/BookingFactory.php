<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Slot;

class BookingFactory extends Factory
{
    public function definition(): array
    {
        $slot = Slot::inRandomOrder()->first() ?? Slot::factory()->create();

        return [
            'user_id' => User::factory(),
            'slot_id' => $slot->id,
            'time_slot' => $slot->time_slot, // Sync with slot relationship
            'date' => $this->faker->dateTimeBetween('now', '+1 month')->format('Y-m-d'),
        ];
    }
}
