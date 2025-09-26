<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookingSlotsRequest;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class BookingSlotsController extends Controller
{
    public function index()
    {
        $bookings = Booking::with('user')->get();

        return response()->json([
            'data' => $bookings
        ], 200);
    }
    public function store(BookingSlotsRequest $request)
    {
        $data = $request->validated();

        $existingBooking = Booking::where('time_slot', $data['time_slot'])
            ->where('date', $data['date'])
            ->first();

        if ($existingBooking) {
            return response()->json([
                'errors' => [
                    'time_slot' => ['This time slot is already booked for the selected date.']
                ]
            ], 422);
        }

        try {
            $booking = Booking::create($data);
            return response()->json([
                'message' => 'Booking created successfully',
                'data' => $booking
            ], 201);

        } catch (QueryException $e) {
            if (str_contains($e->getMessage(), 'UNIQUE constraint failed')) {
                return response()->json([
                    'errors' => [
                        'time_slot' => ['This time slot is already booked for the selected date.']
                    ]
                ], 422);
            }

            return response()->json([
                'message' => 'Database error occurred'
            ], 500);
        }
    }
    public function availableSlots(Request $request)
    {
        $request->validate([
            'date' => 'required|date'
        ]);

        $date = $request->input('date');

        $allSlots = [
            '08:00-09:00',
            '09:00-10:00',
            '10:00-11:00',
            '11:00-12:00',
            '14:00-15:00',
            '15:00-16:00',
            '16:00-17:00'
        ];

        $bookedSlots = Booking::where('date', $date)
            ->pluck('time_slot')
            ->toArray();

        $availableSlots = array_diff($allSlots, $bookedSlots);

        return response()->json([
            'date' => $date,
            'available_slots' => array_values($availableSlots),
            'booked_slots' => $bookedSlots
        ], 200);
    }
}
