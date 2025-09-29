<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookingSlotsRequest;
use App\Models\Booking;
use App\Models\Slot;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;

class BookingSlotsController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $date = $request->query('date', today()->format('Y-m-d'));

        $bookings = Booking::with(['user', 'slot'])
            ->whereDate('date', $date)
            ->get();

        $bookedSlotIds = $bookings->pluck('slot_id')->toArray();

        return response()->json([
            'bookings' => $bookings,
            'booked_slot_ids' => $bookedSlotIds,
            'date' => $date
        ]);
    }

    public function availableSlots(Request $request): JsonResponse
    {
        $date = $request->query('date', today()->format('Y-m-d'));

        $bookedSlotIds = Booking::where('date', $date)
            ->pluck('slot_id')
            ->toArray();

        $availableSlots = Slot::whereNotIn('id', $bookedSlotIds)->get();

        return response()->json([
            'date' => $date,
            'available_slots' => $availableSlots
        ]);
    }

    public function store(BookingSlotsRequest $request): JsonResponse
    {
        $data = $request->validated();

        $slot = Slot::where('time_slot', $data['time_slot'])->first();

        if (!$slot) {
            return response()->json([
                'message' => 'Slot not found'
            ], 404);
        }

        $existingBooking = Booking::where('slot_id', $slot->id)
            ->where('date', $data['date'])
            ->first();

        if ($existingBooking) {
            return response()->json([
                'message' => 'This time slot is already booked for the selected date'
            ], 422);
        }

        try {
            $booking = Booking::create([
                'user_id' => $data['user_id'],
                'slot_id' => $slot->id,
                'time_slot' => $data['time_slot'],
                'date' => $data['date']
            ]);

            $booking->load(['user', 'slot']);

            return response()->json([
                'message' => 'Booking created successfully',
                'booking' => $booking
            ], 201);

        } catch (QueryException $e) {
            return response()->json([
                'message' => 'Failed to create booking',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
