import type {TimeSlotsSectionProps} from "../../../../../Utils/bookingTypes.ts";


export default function TimeSlotsSection({
                                             selectedDate,
                                             selectedSlot,
                                             setSelectedSlot,
                                             slots,
                                             isSlotBooked,
                                             isPastDate,
                                             handleBooking,
                                             loading
                                         }: TimeSlotsSectionProps) {

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("si-LK", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-amber-900 mb-2">
                    {formatDate(selectedDate)}
                </h3>
                <p className="text-amber-700">කැමති වේලාව තෝරන්න</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {slots.map((slot) => {
                    const isBooked = isSlotBooked(slot.slot_name, selectedDate);
                    const isSelected = selectedSlot === slot.slot_name;
                    const isPast = isPastDate(selectedDate);
                    const isDisabled = isBooked || isPast;

                    return (
                        <button
                            key={slot.id}
                            onClick={() => !isDisabled && setSelectedSlot(slot.slot_name)}
                            disabled={isDisabled}
                            className={`
                                p-4 rounded-xl text-left transition-all duration-200 border-2
                                ${isDisabled
                                ? "border-gray-200 bg-gray-100 cursor-not-allowed"
                                : isSelected
                                    ? "border-amber-500 bg-amber-50 shadow-md"
                                    : "border-amber-200 bg-amber-50 hover:border-amber-300 hover:shadow-md"
                            }
                            `}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-semibold text-amber-900 text-lg">
                                        {slot.slot_name}
                                    </div>
                                    <div className="text-sm text-amber-600">
                                        {slot.start_time} - {slot.end_time}
                                    </div>
                                </div>
                                {isBooked && (
                                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                                        වෙන්කර ඇත
                                    </span>
                                )}
                                {isPast && !isBooked && (
                                    <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                                        පසුගිය දිනය
                                    </span>
                                )}
                                {!isDisabled && isSelected && (
                                    <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        තෝරාගත්තා
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
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-orange-600 disabled:from-amber-300 disabled:to-orange-300 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none"
            >
                {loading ? (
                    <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ලියාපදිංචි වෙමින්...
                    </div>
                ) : (
                    "දානය ලියාපදිංචි කරන්න"
                )}
            </button>

            {selectedSlot && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-center gap-3 text-green-800">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <div>
                            <span className="font-semibold">තෝරාගත්තා: </span>
                            {selectedSlot} - {formatDate(selectedDate)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
