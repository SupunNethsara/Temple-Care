<?php

namespace App\Http\Controllers;


use App\Models\Booking;
use Illuminate\Http\Request;

class BookingSlotsController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|uuid|exists:users,id',
            'slot_id' => 'required|exists:slots,id',
            'date' => 'required|date',
        ]);

        $booking = Booking::create($data);


        return response()->json($booking, 201);
    }
}
