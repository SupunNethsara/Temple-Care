import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type {CalendarSectionProps} from "../../../../../Utils/bookingTypes.ts";


const monthNames = [
    "ජනවාරි", "පෙබරවාරි", "මාර්තු", "අප්රේල්", "මැයි", "ජූනි",
    "ජූලි", "අගෝස්තු", "සැප්තැම්බර්", "ඔක්තෝබර්", "නොවැම්බර්", "දෙසැම්බර්",
];

const dayNames = ["ඉ", "ස", "අ", "බ", "බ්‍ර", "සි", "ස"];

export default function CalendarSection({ selectedDate, setSelectedDate, setSelectedSlot }: CalendarSectionProps) {
    const generateDays = (date: Date) => {
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const firstDayOfWeek = startOfMonth.getDay();
        const days = [];

        for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
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

    const isPastDate = (date: Date): boolean => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={prevMonth}
                    className="p-3 rounded-2xl bg-amber-100 hover:bg-amber-200 transition-colors"
                >
                    <ChevronLeftIcon className="h-6 w-6 text-amber-700" />
                </button>
                <h2 className="text-2xl font-bold text-amber-900">
                    {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                </h2>
                <button
                    onClick={nextMonth}
                    className="p-3 rounded-2xl bg-amber-100 hover:bg-amber-200 transition-colors"
                >
                    <ChevronRightIcon className="h-6 w-6 text-amber-700" />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
                {dayNames.map((day) => (
                    <div key={day} className="text-center text-amber-800 font-semibold text-sm py-2">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
                {days.map((day, idx) => {
                    const isPast = day ? isPastDate(day) : false;
                    const isToday = day ? day.toDateString() === new Date().toDateString() : false;
                    const isSelected = day ? day.toDateString() === selectedDate.toDateString() : false;

                    return (
                        <button
                            key={idx}
                            onClick={() => day && !isPast && setSelectedDate(day)}
                            disabled={!day || isPast}
                            className={`
                                aspect-square rounded-xl text-lg font-medium transition-all duration-200
                                ${!day ? "invisible" : ""}
                                ${isToday ? "bg-amber-500 text-white shadow-lg transform scale-105" : ""}
                                ${isSelected && !isToday ? "ring-2 ring-amber-500 bg-amber-50" : ""}
                                ${isPast ? "opacity-40 cursor-not-allowed grayscale bg-gray-100" : "hover:bg-amber-100 hover:shadow-md"}
                                ${!isPast && !isToday && !isSelected ? "bg-amber-50" : ""}
                            `}
                        >
                            {day ? day.getDate() : ""}
                        </button>
                    );
                })}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-amber-500 rounded"></div>
                        <span>අද දිනය</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-amber-100 rounded border border-amber-300"></div>
                        <span>තෝරාගත් දිනය</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
