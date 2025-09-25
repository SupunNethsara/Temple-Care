<?php

namespace App\Http\Controllers;


use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class BookingSlotsController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|uuid|exists:users,id',
            'slot_id' => 'required|exists:slots,id',
            'date' => 'required|date',
        ]);
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
