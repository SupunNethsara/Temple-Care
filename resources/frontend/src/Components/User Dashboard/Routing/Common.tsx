import RecentActivities from "./RecentActivities.tsx";
import UpcomingActivities from "./UpcomingActivities.tsx";

function Common() {
    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentActivities />
                <UpcomingActivities />
            </div>
        </div>
    );
}

export default Common;
