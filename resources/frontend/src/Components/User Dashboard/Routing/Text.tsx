import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

function Dana() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [bookingDetails, setBookingDetails] = useState({
        name: "",
        phone: "",
        amount: "",
        purpose: "",
        type: "individual"
    });

    const timeSlots = [
        "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
        "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
    ];

    const bookedSlots = [
        new Date(new Date().setHours(10, 0, 0, 0)),
        new Date(new Date().setDate(new Date().getDate() + 1)).setHours(2, 0, 0, 0)
    ];

    const isSlotBooked = (date, slot) => {
        return bookedSlots.some(booked =>
            new Date(booked).toDateString() === date.toDateString() &&
            new Date(booked).getHours() === parseInt(slot.split(':')[0])
        );
    };
    const prevMonth = () => {
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("දානය ලියාපදිංචි කිරීම සාර්ථකයි! ඔබගේ රු." + bookingDetails.amount + " දානය " +
            selectedDate.toLocaleDateString('si-LK') + " " + selectedSlot + "ට නියමිතයි.");
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails({
            ...bookingDetails,
            [name]: value
        });
    };

    // Generate calendar days
    const generateCalendarDays = () => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();

        // First day of the month
        const firstDay = new Date(year, month, 1);
        // Last day of the month
        const lastDay = new Date(year, month + 1, 0);
        // Days in month
        const daysInMonth = lastDay.getDate();
        // Starting day of the week (0 = Sunday, 1 = Monday, etc.)
        const startDay = firstDay.getDay();

        const days = [];

        // Previous month's days
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startDay - 1; i >= 0; i--) {
            days.push({
                date: new Date(year, month - 1, prevMonthLastDay - i),
                isCurrentMonth: false,
                isToday: false
            });
        }

        // Current month's days
        const today = new Date();
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            days.push({
                date,
                isCurrentMonth: true,
                isToday: date.toDateString() === today.toDateString()
            });
        }

        // Next month's days
        const daysNeeded = 42 - days.length; // 6 rows x 7 days
        for (let i = 1; i <= daysNeeded; i++) {
            days.push({
                date: new Date(year, month + 1, i),
                isCurrentMonth: false,
                isToday: false
            });
        }

        return days;
    };

    const days = generateCalendarDays();
    const monthNames = ["ජනවාරි", "පෙබරවාරි", "මාර්තු", "අප්‍රේල්", "මැයි", "ජූනි",
        "ජූලි", "අගෝස්තු", "සැප්තැම්බර්", "ඔක්තෝබර්", "නොවැම්බර්", "දෙසැම්බර්"];

    return (
        <div className="min-h-screen bg-amber-50 py-8 px-4">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-amber-700 text-white p-6">
                    <h1 className="text-3xl font-bold text-center">
                        <i className="fas fa-donate mr-3"></i>
                        දානය ලියාපදිංචි කිරීම
                    </h1>
                    <p className="text-center mt-2 text-amber-100">
                        පහත දින දර්ශනයෙන් ඔබට අවශ්‍ය දිනය及වේලාව තෝරන්න
                    </p>
                </div>

                <div className="p-6 md:flex">

                    <div className="md:w-1/2 pr-0 md:pr-6 mb-6 md:mb-0">
                        <div className="bg-white rounded-lg p-4 shadow">
                            <div className="flex items-center justify-between mb-4">
                                <button
                                    onClick={prevMonth}
                                    className="p-2 rounded-full hover:bg-amber-100"
                                >
                                    <ChevronLeftIcon className="h-5 w-5 text-amber-700" />
                                </button>
                                <h2 className="text-xl font-bold text-amber-900">
                                    {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                                </h2>
                                <button
                                    onClick={nextMonth}
                                    className="p-2 rounded-full hover:bg-amber-100"
                                >
                                    <ChevronRightIcon className="h-5 w-5 text-amber-700" />
                                </button>
                            </div>

                            <div className="grid grid-cols-7 gap-2 mb-2">
                                {["ඉ", "ස", "අ", "බ", "බ්‍ර", "සි", "ස"].map(day => (
                                    <div key={day} className="text-center text-amber-800 font-medium text-sm">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-2">
                                {days.map((day, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedDate(day.date)}
                                        className={`p-2 text-center rounded-lg text-sm
                      ${day.isToday ? "bg-amber-500 text-white font-bold" : ""}
                      ${day.isCurrentMonth ? "text-amber-900" : "text-amber-300"}
                      ${day.date.toDateString() === selectedDate.toDateString() ? "ring-2 ring-amber-500" : "hover:bg-amber-100"}
                    `}
                                    >
                                        {day.date.getDate()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Time Slots */}
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-amber-900 mb-3">
                                {selectedDate.toLocaleDateString('si-LK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {timeSlots.map(slot => (
                                    <button
                                        key={slot}
                                        onClick={() => setSelectedSlot(slot)}
                                        disabled={isSlotBooked(selectedDate, slot)}
                                        className={`p-3 rounded-lg text-center text-sm font-medium
                      ${selectedSlot === slot ? "bg-amber-600 text-white" :
                                            isSlotBooked(selectedDate, slot) ? "bg-gray-200 text-gray-400 cursor-not-allowed" :
                                                "bg-amber-100 text-amber-800 hover:bg-amber-200"}
                    `}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="md:w-1/2 pl-0 md:pl-6">
                        <div className="bg-amber-50 rounded-lg p-6 shadow">
                            <h3 className="text-xl font-semibold text-amber-900 mb-6 border-b pb-2">
                                දානයේ විස්තර
                            </h3>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-amber-800 mb-2">නම</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={bookingDetails.name}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-amber-800 mb-2">දුරකථන අංකය</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={bookingDetails.phone}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-amber-800 mb-2">දානයේ ප්‍රමාණය (රුපියල්)</label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={bookingDetails.amount}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-amber-800 mb-2">දානයේ අරමුණ</label>
                                    <select
                                        name="purpose"
                                        value={bookingDetails.purpose}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                                        required
                                    >
                                        <option value="">තෝරන්න</option>
                                        <option value="පින්දානය">පින්දානය</option>
                                        <option value="ගිලන්පස">ගිලන්පස</option>
                                        <option value="පැන්සල">පැන්සල</option>
                                        <option value="භික්ෂු පිරිකර">භික්ෂු පිරිකර</option>
                                        <option value="අනිකුත්">අනිකුත්</option>
                                    </select>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-amber-800 mb-2">දානයේ වර්ගය</label>
                                    <div className="flex space-x-4">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="type"
                                                value="individual"
                                                checked={bookingDetails.type === "individual"}
                                                onChange={handleInputChange}
                                                className="text-amber-600 focus:ring-amber-500"
                                            />
                                            <span className="ml-2">පුද්ගලික</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="type"
                                                value="family"
                                                checked={bookingDetails.type === "family"}
                                                onChange={handleInputChange}
                                                className="text-amber-600 focus:ring-amber-500"
                                            />
                                            <span className="ml-2">පවුල්</span>
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!selectedSlot}
                                    className={`w-full py-3 px-4 rounded-lg font-semibold
                    ${selectedSlot ? "bg-amber-600 hover:bg-amber-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}
                  `}
                                >
                                    දානය ලියාපදිංචි කරන්න
                                </button>
                            </form>
                        </div>

                        {selectedSlot && (
                            <div className="mt-6 p-4 bg-amber-100 rounded-lg border border-amber-200">
                                <h4 className="font-semibold text-amber-800">තෝරාගත් වේලාව</h4>
                                <p className="text-amber-700">
                                    {selectedDate.toLocaleDateString('si-LK')} {selectedSlot}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dana;
