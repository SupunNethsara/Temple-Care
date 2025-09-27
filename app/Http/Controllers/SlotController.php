<?php

namespace App\Http\Controllers;

use App\Models\Slot;
use Illuminate\Http\Request;

class SlotController extends Controller
{
    // GET /api/slots -> all slots
    public function index()
    {
        return response()->json(Slot::all(), 200);
    }

    // POST /api/slots -> create slot
    public function store(Request $request)
    {
        $data = $request->validate([
            'time_slot' => 'required|string|max:255',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        $slot = Slot::create($data);

        return response()->json($slot, 201);
    }

    // GET /api/slots/{id} -> single slot
    public function show($id)
    {
        $slot = Slot::findOrFail($id);
        return response()->json($slot, 200);
    }

    // PUT/PATCH /api/slots/{id} -> update slot
    public function update(Request $request, $id)
    {
        $slot = Slot::findOrFail($id);

        $data = $request->validate([
            'time_slot' => 'required|string|max:255',
            'start_time' => 'sometimes|date_format:H:i',
            'end_time' => 'sometimes|date_format:H:i|after:start_time',
        ]);

        $slot->update($data);

        return response()->json($slot, 200);
    }

    // DELETE /api/slots/{id} -> delete slot
    public function destroy($id)
    {
        $slot = Slot::findOrFail($id);
        $slot->delete();

        return response()->json(null, 204);
    }
}
