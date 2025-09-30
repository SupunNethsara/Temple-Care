
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

function RecentActivities() {
    return (
        <div>
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
        </div>
    );
}

export default RecentActivities;
