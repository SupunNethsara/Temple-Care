<?php

namespace App\Http\Controllers;

use App\Models\Temple;
use Illuminate\Http\Request;

class TempleController extends Controller
{
    public function index(){
        $temples = Temple::all();
        return response()->json($temples);
    }
    public function store(Request $request){
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'contact' => 'required|string|max:15',
            'currency' => 'required|string|max:3',
            'time_zone' => 'required|date',
        ]);
        $temple = Temple::create($validated);
        return response()->json($temple);
    }
}
