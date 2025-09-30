<?php

namespace Database\Seeders;

use App\Models\Slot;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SlotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
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
        foreach ($timeSlots as $slot) {
            [$start, $end] = explode('-', $slot);
            Slot::create([
                'time_slot' => $slot,
                'start_time' => $start,
                'end_time' => $end
            ]);
        }
    }
}
