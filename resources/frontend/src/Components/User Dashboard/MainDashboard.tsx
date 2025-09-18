import { useState } from "react";
import UserDbNavbar from "./UserDbNavbar.tsx";
import { Outlet } from "react-router-dom";

export function MainDashboard() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="min-h-screen bg-amber-50">
            <UserDbNavbar />
            <div className="container mx-auto p-4">
                <div className="bg-white rounded-lg shadow mb-6">
                    <div className="flex border-b">
                        <button
                            className={`px-6 py-3 font-medium ${activeTab === "overview" ? "text-amber-700 border-b-2 border-amber-700" : "text-gray-600"}`}
                            onClick={() => setActiveTab("overview")}
                            style={{ fontFamily: "'Abhaya Libre', serif" }}
                        >
                            දළ විශ්ලේෂණය
                        </button>
                        <button
                            className={`px-6 py-3 font-medium ${activeTab === "events" ? "text-amber-700 border-b-2 border-amber-700" : "text-gray-600"}`}
                            onClick={() => setActiveTab("events")}
                            style={{ fontFamily: "'Abhaya Libre', serif" }}
                        >
                            අවස්ථා
                        </button>
                        <button
                            className={`px-6 py-3 font-medium ${activeTab === "donations" ? "text-amber-700 border-b-2 border-amber-700" : "text-gray-600"}`}
                            onClick={() => setActiveTab("donations")}
                            style={{ fontFamily: "'Abhaya Libre', serif" }}
                        >
                            දානය
                        </button>
                        <button
                            className={`px-6 py-3 font-medium ${activeTab === "devotees" ? "text-amber-700 border-b-2 border-amber-700" : "text-gray-600"}`}
                            onClick={() => setActiveTab("devotees")}
                            style={{ fontFamily: "'Abhaya Libre', serif" }}
                        >
                            භක්තයන්
                        </button>
                    </div>
                </div>

                <Outlet />
            </div>
        </div>
    );
}


