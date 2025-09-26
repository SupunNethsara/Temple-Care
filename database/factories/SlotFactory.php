<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Slot>
 */
class SlotFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = \App\Models\Slot::class;

    public function definition(): array
    {
        return [
            'id' => $this->faker->unique()->randomNumber(),
            'slot_name' => $this->faker->randomElement(['Morning', 'Afternoon']),
            'time' => $this->faker->time('H:i') . ' - ' . $this->faker->time('H:i', 'now'),
        ];
    }
}
