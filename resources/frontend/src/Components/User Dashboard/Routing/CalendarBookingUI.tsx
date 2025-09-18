import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function CalendarBookingUI() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const monthNames = [
        "ජනවාරි",
        "පෙබරවාරි",
        "මාර්තු",
        "අප්රේල්",
        "මැයි",
        "ජූනි",
        "ජූලි",
        "අගෝස්තු",
        "සැප්තැම්බර්",
        "ඔක්තෝබර්",
        "නොවැම්බර්",
        "දෙසැම්බර්",
    ];

    const generateDays = (date : any) => {
        new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const days = [];

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
    };

    const nextMonth = () => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setSelectedDate(newDate);
    };

    return (
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
                    {days.map((day, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedDate(day)}
                            className={`p-2 text-center rounded-lg text-sm
                ${day.toDateString() === new Date().toDateString() ? "bg-amber-500 text-white font-bold" : ""}
                ${day.toDateString() === selectedDate.toDateString() ? "ring-2 ring-amber-500" : "hover:bg-amber-100"}
              `}
                        >
                            {day.getDate()}
                        </button>
                    ))}
                </div>
            </div>


        </div>
    );
}
