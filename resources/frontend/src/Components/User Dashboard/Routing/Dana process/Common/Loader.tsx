function Loader() {
    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-4"></div>
                    <h3 className="text-xl font-semibold text-gray-800">දත්ත ලබා ගනිමින්...</h3>
                    <p className="text-gray-600 mt-2">කරුණාකර රැඳී සිටින්න</p>
                </div>
            </div>
        </div>
    );
}

export default Loader;
