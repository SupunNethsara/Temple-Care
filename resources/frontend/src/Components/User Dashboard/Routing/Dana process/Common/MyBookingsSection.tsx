import type {MyBookingsSectionProps} from "../../../../../Utils/bookingTypes.ts";


export default function MyBookingsSection({
                                              myBookings,
                                              setSelectedDate,
                                              setSelectedSlot,
                                              setActiveTab
                                          }: MyBookingsSectionProps) {

    const formatDateDisplay = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("si-LK", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
        });
    };
    console.log(myBookings , 'Mu bookings')

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-amber-900 flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                    </svg>
                    මගේ දානයන්
                </h2>
                <p className="text-amber-700 mt-1">ඔබ ලියාපදිංචි කර ඇති සියලුම දානයන්</p>
            </div>

            {myBookings.length === 0 ? (
                <EmptyBookings setActiveTab={setActiveTab} />
            ) : (
                <BookingsTable
                    myBookings={myBookings}
                    formatDateDisplay={formatDateDisplay}
                    setSelectedDate={setSelectedDate}
                    setSelectedSlot={setSelectedSlot}
                    setActiveTab={setActiveTab}
                />
            )}
        </div>
    );
}

const EmptyBookings = ({ setActiveTab }: { setActiveTab: (tab: "book") => void }) => (
    <div className="text-center py-16">
        <div className="text-amber-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
            </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">දානයන් නැත</h3>
        <p className="text-gray-500 mb-6">ඔබ තවම දානයන් ලියාපදිංචි කර නැත</p>
        <button
            onClick={() => setActiveTab("book")}
            className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
            පළමු දානය ලියාපදිංචි කරන්න
        </button>
    </div>
);

const BookingsTable = ({
                           myBookings,
                           formatDateDisplay,
                           setSelectedDate,
                           setSelectedSlot,
                           setActiveTab
                       }: any) => (
    <div className="overflow-x-auto">
        <table className="w-full">
            <thead className="bg-amber-50">
            <tr>
                <th className="p-4 text-left text-amber-900 font-semibold">දිනය</th>
                <th className="p-4 text-left text-amber-900 font-semibold">වේලාව</th>
                <th className="p-4 text-left text-amber-900 font-semibold">තත්වය</th>
                <th className="p-4 text-left text-amber-900 font-semibold">ක්‍රියා</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {myBookings.map((booking: any) => (
                <tr key={booking.id} className="hover:bg-amber-50 transition-colors">
                    <td className="p-4">
                        <div className="font-medium text-gray-900">
                            {formatDateDisplay(booking.date)}
                        </div>
                    </td>
                    <td className="p-4">
                        <div className="text-amber-700 font-semibold">
                            {booking.time_slot}
                        </div>
                    </td>
                    <td className="p-4">
                            <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                ලියාපදිංචි විය
                            </span>
                    </td>
                    <td className="p-4">
                        <button
                            onClick={() => {
                                setSelectedDate(new Date(booking.date + "T00:00:00"));
                                setSelectedSlot(booking.time_slot);
                                setActiveTab("book");
                            }}
                            className="text-amber-600 hover:text-amber-800 font-medium text-sm"
                        >
                            නැවත බලන්න
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);
