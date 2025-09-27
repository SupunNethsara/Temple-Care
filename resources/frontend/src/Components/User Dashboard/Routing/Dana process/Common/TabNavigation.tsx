import type {TabNavigationProps} from "../../../../../Utils/bookingTypes.ts";


export default function TabNavigation({ activeTab, setActiveTab, myBookingsCount }: TabNavigationProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg mb-6">
            <div className="flex border-b border-gray-200">
                <TabButton
                    active={activeTab === "book"}
                    onClick={() => setActiveTab("book")}
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    }
                    label="දානය ලියාපදිංචි කරන්න"
                />
                <TabButton
                    active={activeTab === "my-bookings"}
                    onClick={() => setActiveTab("my-bookings")}
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    }
                    label={`මගේ දානයන් (${myBookingsCount})`}
                />
            </div>
        </div>
    );
}

const TabButton = ({ active, onClick, icon, label }: any) => (
    <button
        onClick={onClick}
        className={`flex-1 py-4 px-6 font-semibold text-lg transition-colors ${
            active
                ? "border-b-2 border-amber-500 text-amber-600 bg-amber-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
        }`}
    >
        <div className="flex items-center justify-center gap-2">
            {icon}
            {label}
        </div>
    </button>
);
