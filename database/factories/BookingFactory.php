<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BookingFactory extends Factory
{
    public function definition(): array
    {
        $timeSlots = [
            '08:00-09:00',
            '09:00-10:00',
            '10:00-11:00',
            '11:00-12:00',
            '14:00-15:00',
            '15:00-16:00',
            '16:00-17:00'
        ];

        return [
            'user_id' => \App\Models\User::factory(),
            'time_slot' => $this->faker->randomElement($timeSlots),
            'date' => $this->faker->dateTimeBetween('now', '+1 month')->format('Y-m-d'),
        ];
    }
}
