<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookingSlotsRequest;
use App\Models\Booking;
use App\Models\Slot;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class BookingSlotsController extends Controller
{
    public function index(Request $request)
    {
        $bookings = Booking::with(['user', 'slot'])->get();
        if ($request->has('user_id')) {
            $userBookings = Booking::with(['user', 'slot'])
                ->where('user_id', $request->user_id)
                ->get();

            return response()->json([
                'all_bookings' => $bookings,
                'my_bookings' => $userBookings
            ], 200);
        }

        return response()->json([
            'data' => $bookings
        ], 200);
    }

    public function store(BookingSlotsRequest $request)
    {
        $data = $request->validated();

        $slot = Slot::where('time_slot', $data['time_slot'])->first();

        if (!$slot) {
            $times = explode('-', $data['time_slot']);
            $startTime = $times[0] ?? null;
            $endTime = $times[1] ?? null;

            if ($startTime && $endTime) {
                $slot = Slot::create([
                    'time_slot' => $data['time_slot'],
                    'start_time' => $startTime,
                    'end_time' => $endTime,
                ]);
            } else {
                return response()->json([
                    'errors' => ['time_slot' => ['Invalid time slot selected']]
                ], 422);
            }
        }

        try {
            $booking = Booking::create([
                'user_id' => $data['user_id'],
                'time_slot' => $data['time_slot'],
                'date' => $data['date']
            ]);

            $booking->load(['user', 'slot']);

            return response()->json([
                'message' => 'Booking created successfully',
                'data' => $booking
            ], 201);

        }catch (QueryException $e) {
            return response()->json([
                'message' => 'Database error occurred',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function availableSlots(Request $request)
    {
        $request->validate([
            'date' => 'required|date'
        ]);

        $date = $request->input('date');

        $allSlots = Slot::all()->pluck('slot_name')->toArray();

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
    public function myBookings($userId)
    {
        $bookings = Booking::with(['user', 'slot'])
            ->where('user_id', $userId)
            ->orderBy('date', 'desc')
            ->orderBy('time_slot')
            ->get();

        return response()->json([
            'data' => $bookings
        ], 200);
    }
}
