function UserIdError() {
    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
                    <div className="text-red-500 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">ප්‍රවේශය ප්‍රතික්ෂේප කරන ලදී</h2>
                    <p className="text-gray-600 mb-6">කරුණාකර පුරනය වීමට හෝ ගිණුමක් සාදාගන්න</p>
                    <button
                        onClick={() => window.location.href = '/login'}
                        className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-lg transition-colors w-full"
                    >
                        පුරනය වන්න
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserIdError;
