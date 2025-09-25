<?php

namespace App\Http\Controllers;


use App\Http\Requests\BookingSlotsRequest;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class BookingSlotsController extends Controller
{
    public function index()
    {
        $bookings = Booking::all();

        return response()->json([
            'data' => $bookings
        ], 200);
    }

    public function store(BookingSlotsRequest $request)
    {
        $data = $request->validated();
        $exists = Booking::where('slot_id' ,$data['slot_id'])->where('date', $data['date'])->exists();

        if ($exists) {
            throw ValidationException::withMessages([
                'slot_id' => ['This slot is already booked for the selected date.'],
            ]);
        }
        $booking = Booking::create($data);


        return response()->json($booking, 201);
    }
}
