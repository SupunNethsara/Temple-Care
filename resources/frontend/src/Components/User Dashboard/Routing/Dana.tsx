import CalendarBookingUI from "./CalendarBookingUI.tsx";

function Dana() {
    return (
        <div className="min-h-screen bg-amber-50 py-2 px-2">
            <div className="max-w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-amber-700 text-white p-6">
                    <h1 className="text-3xl font-bold text-center">
                        <i className="fas fa-donate mr-3"></i>
                        දානය ලියාපදිංචි කිරීම
                    </h1>
                    <p className="text-center mt-2 text-amber-100">
                        පහත දින දර්ශනයෙන් ඔබට අවශ්‍ය දිනය及වේලාව තෝරන්න
                    </p>
                </div>
            </div>
            <CalendarBookingUI />
        </div>
    );
}

export default Dana;
