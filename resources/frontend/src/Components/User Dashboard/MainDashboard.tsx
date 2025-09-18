import { useState } from "react";
import UserDbNavbar from "./UserDbNavbar.tsx";
import { Outlet, Link, useLocation } from "react-router-dom";

export function MainDashboard() {
    const location = useLocation();
    const getActiveTab = () => {
        if (location.pathname.includes("danaevents")) return "donations";
        if (location.pathname.includes("devotees")) return "devotees";
        if (location.pathname.includes("events")) return "events";
        return "overview";
    };

    const [activeTab, setActiveTab] = useState(getActiveTab());

    return (
        <div className="min-h-screen bg-amber-50">
            <UserDbNavbar />
            <div className="container mx-auto p-4">
                <div className="bg-white rounded-lg shadow mb-6">
                    <div className="flex border-b">
                        <Link
                            to="/MainDashboard"
                            className={`px-6 py-3 font-medium ${activeTab === "overview" ? "text-amber-700 border-b-2 border-amber-700" : "text-gray-600"}`}
                            onClick={() => setActiveTab("overview")}
                            style={{ fontFamily: "'Abhaya Libre', serif" }}
                        >
                            දළ විශ්ලේෂණය
                        </Link>
                        <Link
                            to="/MainDashboard/events"
                            className={`px-6 py-3 font-medium ${activeTab === "events" ? "text-amber-700 border-b-2 border-amber-700" : "text-gray-600"}`}
                            onClick={() => setActiveTab("events")}
                            style={{ fontFamily: "'Abhaya Libre', serif" }}
                        >
                            අවස්ථා
                        </Link>
                        <Link
                            to="/MainDashboard/danaevents"
                            className={`px-6 py-3 font-medium ${activeTab === "donations" ? "text-amber-700 border-b-2 border-amber-700" : "text-gray-600"}`}
                            onClick={() => setActiveTab("donations")}
                            style={{ fontFamily: "'Abhaya Libre', serif" }}
                        >
                            දානය
                        </Link>
                        <Link
                            to="/MainDashboard/devotees"
                            className={`px-6 py-3 font-medium ${activeTab === "devotees" ? "text-amber-700 border-b-2 border-amber-700" : "text-gray-600"}`}
                            onClick={() => setActiveTab("devotees")}
                            style={{ fontFamily: "'Abhaya Libre', serif" }}
                        >
                            භක්තයන්
                        </Link>
                    </div>
                </div>

                <Outlet />
            </div>
        </div>
    );
}
