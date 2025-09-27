import { useState, useEffect } from "react";
import axios from "axios";
import UserIdError from "./Common/UserIdError.tsx";
import Loader from "./Common/Loader.tsx";
import MessageAlert from "./Common/MessageAlert.tsx";

import type {Booking, Slot, MessageType} from "../../../../Utils/bookingTypes.ts";
import TabNavigation from "./Common/TabNavigation.tsx";
import CalendarSection from "./Common/CalendarSection.tsx";
import TimeSlotsSection from "./Common/TimeSlotsSection.tsx";
import MyBookingsSection from "./Common/MyBookingsSection.tsx";

const TIME_SLOTS = [
    "08:00-09:00",
    "09:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00",
];

export default function CalendarBookingUI() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [myBookings, setMyBookings] = useState<Booking[]>([]);
    const [slots, setSlots] = useState<Slot[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<MessageType | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"book" | "my-bookings">("book");
    const [fetchLoading, setFetchLoading] = useState(true);

    useEffect(() => {
        const userString = localStorage.getItem("user");
        if (userString) {
            try {
                const user = JSON.parse(userString) as { id: string };
                setUserId(user.id);
            } catch {
                setUserId(null);
            }
        } else {
            setUserId(null);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            fetchAllData();
        }
    }, [userId]);

    const fetchAllData = async () => {
        setFetchLoading(true);
        try {
            try {
                const slotsResponse = await axios.get("http://localhost:8000/api/slots");
                setSlots(slotsResponse.data);
            } catch (error) {
                console.warn("Using fallback slots data");
                const fallbackSlots: Slot[] = TIME_SLOTS.map((slot, index) => ({
                    id: (index + 1).toString(),
                    slot_name: slot,
                    start_time: slot.split("-")[0],
                    end_time: slot.split("-")[1],
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                }));
                setSlots(fallbackSlots);
            }
            await fetchBookings();
        } catch (error) {
            console.error("Error fetching data:", error);
            showMessage("error", "දත්ත ලබා ගැනීමට නොහැකි විය");
        } finally {
            setFetchLoading(false);
        }
    };

    const fetchBookings = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/booking");
            const bookingsData = response.data.data || response.data.all_bookings || [];
            setBookings(bookingsData);

            if (userId) {
                const userBookings = bookingsData.filter((booking: Booking) => booking.user_id === userId);
                setMyBookings(userBookings);
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
            showMessage("error", "දත්ත ලබා ගැනීමට නොහැකි විය");
        }
    };

    const isPastDate = (date: Date): boolean => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const isSlotBooked = (timeSlot: string, date: Date) => {
        const dateString = date.toISOString().split("T")[0];
        return bookings.some(
            (booking) => booking.time_slot === timeSlot && booking.date === dateString
        );
    };

    const handleBooking = async () => {
        if (!selectedSlot) {
            showMessage("error", "කරුණාකර වේලාවක් තෝරන්න");
            return;
        }

        if (isPastDate(selectedDate)) {
            showMessage("error", "පසුගිය දිනයක් තෝරාගත නොහැක");
            return;
        }

        if (!userId) {
            showMessage("error", "පරිශීලකයා හඳුනාගත නොහැක");
            return;
        }

        setLoading(true);
        try {
            const bookingData = {
                user_id: userId,
                time_slot: selectedSlot,
                date: selectedDate.toISOString().split("T")[0],
            };

            await axios.post("http://localhost:8000/api/booking", bookingData);
            showMessage("success", "දානය සාර්ථකව ලියාපදිංචි කළා!");
            setSelectedSlot(null);
            await fetchAllData();
            setActiveTab("my-bookings");
        } catch (error: any) {
            if (error.response?.status === 422) {
                showMessage("error", "මෙම වේලාව දැනටමත් වෙන්කර ඇත");
            } else {
                showMessage("error", "ලියාපදිංචි කිරීමට නොහැකි විය");
            }
        } finally {
            setLoading(false);
        }
    };

    const showMessage = (type: "success" | "error", text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 5000);
    };

    const getAvailableSlots = () => {
        return slots.length > 0
            ? slots
            : TIME_SLOTS.map((slot, index) => ({
                id: (index + 1).toString(),
                slot_name: slot,
                start_time: slot.split("-")[0],
                end_time: slot.split("-")[1],
            }));
    };

    if (userId === null) {
        return <UserIdError />;
    }

    if (fetchLoading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                <Header />

                <TabNavigation
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    myBookingsCount={myBookings.length}
                />

                <MessageAlert message={message} setMessage={setMessage} />

                {activeTab === "book" ? (
                    <div className="grid lg:grid-cols-2 gap-8">
                        <CalendarSection
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            setSelectedSlot={setSelectedSlot}
                        />

                        <TimeSlotsSection
                            selectedDate={selectedDate}
                            selectedSlot={selectedSlot}
                            setSelectedSlot={setSelectedSlot}
                            slots={getAvailableSlots()}
                            isSlotBooked={isSlotBooked}
                            isPastDate={isPastDate}
                            handleBooking={handleBooking}
                            loading={loading}
                        />
                    </div>
                ) : (
                    <MyBookingsSection
                        myBookings={myBookings}
                        setSelectedDate={setSelectedDate}
                        setSelectedSlot={setSelectedSlot}
                        setActiveTab={setActiveTab}
                    />
                )}
            </div>
        </div>
    );
}

const Header = () => (
    <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">
            දානය ලියාපදිංචි කිරීම
        </h1>
        <p className="text-amber-700 text-lg">
            ඔබගේ දානය ලියාපදිංචි කිරීමට කැමති දිනය සහ වේලාව තෝරන්න
        </p>
    </div>
);
