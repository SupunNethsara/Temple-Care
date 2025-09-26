<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookingSlotsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => 'required|uuid|exists:users,id',
            'time_slot' => 'required|string|in:08:00-09:00,09:00-10:00,10:00-11:00,11:00-12:00,14:00-15:00,15:00-16:00,16:00-17:00',
            'date' => 'required|date|after_or_equal:today'
        ];
    }

    public function messages(): array
    {
        return [
            'time_slot.in' => 'The selected time slot is not available.',
            'date.after_or_equal' => 'You cannot book for past dates.',
        ];
    }
}
