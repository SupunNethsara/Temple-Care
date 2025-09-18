import Stats from "./Stats.tsx";

function CheckingStats() {
    return (
        <div>
            <Stats />
            <CheckingStats/>
        </div>
    );
}

export default CheckingStats;
