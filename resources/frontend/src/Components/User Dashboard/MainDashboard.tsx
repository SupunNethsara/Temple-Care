import { useState } from "react";
import UserDbNavbar from "./UserDbNavbar.tsx";

function MainDashboard() {
    const [activeTab, setActiveTab] = useState("overview");

  

    const recentActivities = [
        {
            action: "නව දානයක් ලැබුණි",
            user: "සමන් පෙරේරා",
            time: "පැය 2 කට පෙර",
        },
        {
            action: "පුජා චාරිත්‍රය නිමාවිය",
            user: "වෙන්. ධම්මරතන හිමි",
            time: "පැය 4 කට පෙර",
        },
        {
            action: "නව ස්වේච්ඡා සේවකයා ලියාපදිංචි විය",
            user: "නිමල් ප්‍රනාන්දු",
            time: "දින 1 කට පෙර",
        },
        {
            action: "දානය සංවිධානය කරන ලදී",
            user: "හිමිපාණන්",
            time: "දින 1 කට පෙර",
        },
        {
            action: "විහාරය නඩත්තු කිරීම් නිමාවිය",
            user: "මෙහෙයවීම",
            time: "දින 2 කට පෙර",
        },
    ];

    const upcomingEvents = [
        {
            title: "පොසොන් පොහොය",
            date: "ජුනි 21, 2023",
            time: "පෙ.ව. 6:00",
            type: "පොහොය දිනය",
        },
        {
            title: "ධර්ම පාසල",
            date: "ජුනි 23, 2023",
            time: "ප.ව. 4:00",
            type: "සතිපතා",
        },
        {
            title: "සීල වැඩසටහන",
            date: "ජුනි 25, 2023",
            time: "පෙ.ව. 8:00",
            type: "විශේෂ",
        },
        {
            title: "ඇසළ පුර පසළොස්වක",
            date: "ජුලි 3, 2023",
            time: "දින පුරා",
            type: "පොහොය දිනය",
        },
    ];

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



                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2
                            className="text-xl font-bold text-amber-800 mb-4"
                            style={{ fontFamily: "'Abhaya Libre', serif" }}
                        >
                            මෑත ක්‍රියාකාරකම්
                        </h2>
                        <div className="space-y-4">
                            {recentActivities.map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex items-start border-b pb-4 last:border-0 last:pb-0"
                                >
                                    <div className="bg-amber-100 p-2 rounded-full mr-3">
                                        <span className="text-amber-700">
                                            •
                                        </span>
                                    </div>
                                    <div>
                                        <p
                                            className="font-medium"
                                            style={{
                                                fontFamily:
                                                    "'Abhaya Libre', serif",
                                            }}
                                        >
                                            {activity.action}
                                        </p>
                                        <p
                                            className="text-sm text-gray-600"
                                            style={{
                                                fontFamily:
                                                    "'Abhaya Libre', serif",
                                            }}
                                        >
                                            {activity.user} • {activity.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h2
                            className="text-xl font-bold text-amber-800 mb-4"
                            style={{ fontFamily: "'Abhaya Libre', serif" }}
                        >
                            ඉදිරි අවස්ථා
                        </h2>
                        <div className="space-y-4">
                            {upcomingEvents.map((event, index) => (
                                <div
                                    key={index}
                                    className="border-b pb-4 last:border-0 last:pb-0"
                                >
                                    <div className="flex justify-between items-start">
                                        <h3
                                            className="font-medium text-amber-800"
                                            style={{
                                                fontFamily:
                                                    "'Abhaya Libre', serif",
                                            }}
                                        >
                                            {event.title}
                                        </h3>
                                        <span
                                            className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full"
                                            style={{
                                                fontFamily:
                                                    "'Abhaya Libre', serif",
                                            }}
                                        >
                                            {event.type}
                                        </span>
                                    </div>
                                    <p
                                        className="text-sm text-gray-600 mt-1"
                                        style={{
                                            fontFamily: "'Abhaya Libre', serif",
                                        }}
                                    >
                                        {event.date} • {event.time}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default MainDashboard;
