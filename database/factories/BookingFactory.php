<?php

namespace Database\Factories;

use App\Models\Slot;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = \App\Models\Booking::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory()->create()->id,
            'slot_id' => Slot::factory()->create()->id,
            'date' => $this->faker->date('Y-m-d'),
        ];
    }

}
