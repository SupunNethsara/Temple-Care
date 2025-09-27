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
            'time_slot' => 'required',
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
