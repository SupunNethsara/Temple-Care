const stats = [
    { title: "අද පැමිණෙන්නන්", value: "142", change: "+12%", icon: "👥" },
    { title: "ඉදිරි අවස්ථා", value: "5", change: "+2", icon: "📅" },
    { title: "දානය", value: "රු.24,520", change: "+8%", icon: "💰" },
    { title: "ස්වේච්ඡා සේවකයන්", value: "28", change: "+3", icon: "🙏" },
];

function Stats() {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow p-6 flex items-center justify-between"
                    >
                        <div>
                            <p
                                className="text-gray-600 mb-1"
                                style={{
                                    fontFamily: "'Abhaya Libre', serif",
                                }}
                            >
                                {stat.title}
                            </p>
                            <h3 className="text-3xl font-bold text-amber-800">
                                {stat.value}
                            </h3>
                            <p className="text-green-600 text-sm mt-1">
                                {stat.change}
                            </p>
                        </div>
                        <div className="text-3xl bg-amber-100 p-3 rounded-full">
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Stats;
