export interface Booking {
    id: string;
    user_id: string;
    slot_id: string;
    time_slot: string;
    date: string;
    slot?: {
        id: string;
        slot_name: string;
        start_time: string;
        end_time: string;
    };
}

export interface Slot {
    id: string;
    slot_name: string;
    start_time: string;
    end_time: string;
    created_at?: string;
    updated_at?: string;
}

export interface MessageType {
    type: "success" | "error";
    text: string;
}

export interface CalendarSectionProps {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    setSelectedSlot: (slot: string | null) => void;
}

export interface TimeSlotsSectionProps {
    selectedDate: Date;
    selectedSlot: string | null;
    setSelectedSlot: (slot: string | null) => void;
    slots: Slot[];
    isSlotBooked: (timeSlot: string, date: Date) => boolean;
    isPastDate: (date: Date) => boolean;
    handleBooking: () => void;
    loading: boolean;
}

export interface MyBookingsSectionProps {
    myBookings: Booking[];
    setSelectedDate: (date: Date) => void;
    setSelectedSlot: (slot: string) => void;
    setActiveTab: (tab: "book" | "my-bookings") => void;
}

export interface TabNavigationProps {
    activeTab: "book" | "my-bookings";
    setActiveTab: (tab: "book" | "my-bookings") => void;
    myBookingsCount: number;
}
