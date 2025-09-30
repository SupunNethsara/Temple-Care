<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Slot;

class SlotFactory extends Factory
{
    protected $model = Slot::class;

    public function definition(): array
    {
        $timeSlots = [
            "08:00-09:00",
            "09:00-10:00",
            "10:00-11:00",
            "11:00-12:00",
            "14:00-15:00",
            "15:00-16:00",
            "16:00-17:00",
        ];

        $slot = $this->faker->randomElement($timeSlots);
        [$start, $end] = explode('-', $slot);

        return [
            'id' => $this->faker->uuid(), // unique UUID
            'time_slot' => $slot,
            'start_time' => $start,
            'end_time' => $end,
        ];
    }
}
