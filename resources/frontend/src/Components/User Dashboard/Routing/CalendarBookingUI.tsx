import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import axios from "axios";

interface Booking {
    id: number;
    user_id: number;
    slot_id: number;
    date: string;
}

interface TimeSlot {
    id: number;
    start_time: string;
    end_time: string;
}

interface BookingRequest {
    user_id: number;
    slot_id: number;
    date: string;
}

export default function CalendarBookingUI() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const monthNames = [
        "ජනවාරි", "පෙබරවාරි", "මාර්තු", "අප්රේල්", "මැයි", "ජූනි",
        "ජූලි", "අගෝස්තු", "සැප්තැම්බර්", "ඔක්තෝබර්", "නොවැම්බර්", "දෙසැම්බර්",
    ];

    useEffect(() => {
        fetchBookings();
        fetchTimeSlots();
    }, []);


    const isPastDate = (date: Date): boolean => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const fetchBookings = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/booking');
            setBookings(response.data.data);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            showMessage('error', 'දත්ත ලබා ගැනීමට නොහැකි විය');
        }
    };

    const fetchTimeSlots = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/time-slots');
            setTimeSlots(response.data.data);
        } catch (error) {
            console.error('Error fetching time slots:', error);
            setTimeSlots([
                { id: 1, start_time: "08:00", end_time: "09:00" },
                { id: 2, start_time: "09:00", end_time: "10:00" },
                { id: 3, start_time: "10:00", end_time: "11:00" },
                { id: 4, start_time: "14:00", end_time: "15:00" },
                { id: 5, start_time: "15:00", end_time: "16:00" },
                { id: 6, start_time: "16:00", end_time: "17:00" },
            ]);
        }
    };

    const generateDays = (date: Date) => {
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        // Get the day of the week for the first day (0 = Sunday)
        const firstDayOfWeek = startOfMonth.getDay();
        const days = [];

        // Add empty cells for days before the first day of month
        for (let i = 0; i < firstDayOfWeek; i++) {
            days.push(null);
        }

        // Add days of the month
        for (let i = 1; i <= endOfMonth.getDate(); i++) {
            days.push(new Date(date.getFullYear(), date.getMonth(), i));
        }

        return days;
    };

    const days = generateDays(selectedDate);

    const prevMonth = () => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setSelectedDate(newDate);
        setSelectedSlot(null);
    };

    const nextMonth = () => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setSelectedDate(newDate);
        setSelectedSlot(null);
    };

    const isSlotBooked = (slotId: number, date: Date) => {
        const dateString = date.toISOString().split('T')[0];
        return bookings.some(booking =>
            booking.slot_id === slotId && booking.date === dateString
        );
    };

    const handleBooking = async () => {
        if (!selectedSlot) {
            showMessage('error', 'කරුණාකර වේලාවක් තෝරන්න');
            return;
        }

        if (isPastDate(selectedDate)) {
            showMessage('error', 'පසුගිය දිනයක් තෝරාගත නොහැක');
            return;
        }

        setLoading(true);
        try {
            const bookingData: BookingRequest = {
                user_id: 1,
                slot_id: selectedSlot,
                date: selectedDate.toISOString().split('T')[0]
            };

            const response = await axios.post('http://localhost:8000/api/booking', bookingData);
            console.log(response);
            showMessage('success', 'දානය සාර්ථකව ලියාපදිංචි කළා!');
            setSelectedSlot(null);
            await fetchBookings();
        } catch (error: any) {
            if (error.response?.status === 422) {
                showMessage('error', 'මෙම වේලාව දැනටමත් වෙන්කර ඇත');
            } else {
                showMessage('error', 'ලියාපදිංචි කිරීමට නොහැකි විය');
            }
        } finally {
            setLoading(false);
        }
    };

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 5000);
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('si-LK', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
    };

    return (
        <div className="md:flex gap-6 p-6">
            <div className="md:w-1/2 pr-0 md:pr-6 mt-3 mb-6 md:mb-0">
                <div className="bg-white rounded-lg p-4 shadow">
                    <div className="flex items-center justify-between mb-4">
                        <button onClick={prevMonth} className="p-2 rounded-full hover:bg-amber-100">
                            <ChevronLeftIcon className="h-5 w-5 text-amber-700" />
                        </button>
                        <h2 className="text-xl font-bold text-amber-900">
                            {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                        </h2>
                        <button onClick={nextMonth} className="p-2 rounded-full hover:bg-amber-100">
                            <ChevronRightIcon className="h-5 w-5 text-amber-700" />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-2 mb-2">
                        {["ඉ", "ස", "අ", "බ", "බ්‍ර", "සි", "ස"].map((day) => (
                            <div key={day} className="text-center text-amber-800 font-medium text-sm">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                        {days.map((day, idx) => {
                            const isPast = day ? isPastDate(day) : false;

                            return (
                                <button
                                    key={idx}
                                    onClick={() => day && !isPast && setSelectedDate(day)}
                                    className={`p-2 text-center rounded-lg text-sm transition-colors min-h-[40px]
                                        ${!day ? 'invisible' : ''}
                                        ${day && day.toDateString() === new Date().toDateString()
                                        ? "bg-amber-500 text-white font-bold"
                                        : ""}
                                        ${day && day.toDateString() === selectedDate.toDateString()
                                        ? "ring-2 ring-amber-500 bg-amber-50"
                                        : "hover:bg-amber-100"}
                                        ${isPast
                                        ? "opacity-50 cursor-not-allowed grayscale"
                                        : ""}
                                    `}
                                    disabled={!day || isPast}
                                >
                                    {day ? day.getDate() : ''}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="md:w-1/2">
                <div className="bg-white rounded-lg p-6 shadow">
                    <h3 className="text-lg font-bold text-amber-900 mb-4">
                        {formatDate(selectedDate)}
                    </h3>

                    {message && (
                        <div className={`p-3 rounded mb-4 ${
                            message.type === 'success'
                                ? 'bg-green-100 text-green-800 border border-green-200'
                                : 'bg-red-100 text-red-800 border border-red-200'
                        }`}>
                            {message.text}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 mb-6">
                        {timeSlots.map((slot) => {
                            const isBooked = isSlotBooked(slot.id, selectedDate);
                            const isSelected = selectedSlot === slot.id;
                            const isPast = isPastDate(selectedDate);
                            const isDisabled = isBooked || isPast;

                            return (
                                <button
                                    key={slot.id}
                                    onClick={() => !isDisabled && setSelectedSlot(slot.id)}
                                    disabled={isDisabled}
                                    className={`p-3 rounded-lg text-sm font-medium transition-colors
                                        ${isDisabled
                                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                        : isSelected
                                            ? "bg-amber-500 text-white"
                                            : "bg-amber-100 text-amber-800 hover:bg-amber-200"}
                                    `}
                                >
                                    <div className="flex justify-between items-center">
                                        <span>{slot.start_time} - {slot.end_time}</span>
                                        {isBooked && (
                                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                                වෙන්කර ඇත
                                            </span>
                                        )}
                                        {isPast && !isBooked && (
                                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                පසුගිය දිනය
                                            </span>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={handleBooking}
                        disabled={loading || !selectedSlot || isPastDate(selectedDate)}
                        className="w-full bg-amber-600 text-white py-3 rounded-lg font-medium hover:bg-amber-700 disabled:bg-amber-300 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? "ලියාපදිංචි වෙමින්..." : "දානය ලියාපදිංචි කරන්න"}
                    </button>

                    <div className="mt-4 text-sm text-gray-600">
                        <p className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-amber-500 rounded"></span>
                            අද දිනය
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-amber-100 rounded border border-amber-300"></span>
                            තෝරාගත් දිනය
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
