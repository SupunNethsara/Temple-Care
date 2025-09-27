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

        $booking = Booking::create([
            'user_id' => $data['user_id'],
            'time_slot' => $data['time_slot'],
            'date' => $data['date']
        ]);

        return response()->json([
           'data'=>$data,
           'message'=>'Booking create successful'
        ], 201);

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
