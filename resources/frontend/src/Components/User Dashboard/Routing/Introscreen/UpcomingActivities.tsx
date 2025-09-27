
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
function UpcomingActivities() {
    return (
        <div>
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
    );
}

export default UpcomingActivities;
