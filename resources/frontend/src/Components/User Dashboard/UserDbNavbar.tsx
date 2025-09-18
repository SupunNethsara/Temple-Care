import { useState } from "react";
import { LogOutModal } from "./LogOutModal.tsx";

function UserDbNavbar() {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleSignOut = () => {

        console.log("User signed out");
        alert("සාදරයෙන් පිටවන්න! (Signed out successfully!)");
    };

    return (
        <div>
            <header className="bg-gradient-to-r from-amber-700 to-amber-800 text-white p-4 shadow-lg">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12  rounded-full flex items-center justify-center shadow-md overflow-hidden">
                            <img
                                src="/logo.png"
                                alt="Temple Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h1 className="text-xl md:text-2xl font-bold" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                            නිවුන්හැල්ල ශ්‍රී ශ්‍යිලබිම්බාරාම විහාරස්ථානය
                        </h1>
                    </div>

                    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                        <div className="flex flex-wrap justify-center gap-2">
                            <button
                                className="bg-amber-100 hover:bg-amber-200 text-amber-800 py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
                                style={{ fontFamily: "'Abhaya Libre', serif" }}
                            >
                                <i className="fas fa-donate mr-2"></i>
                                දානය ලියාපදිංචි කරන්න
                            </button>
                            <button
                                className="bg-amber-100 hover:bg-amber-200 text-amber-800 py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
                                style={{ fontFamily: "'Abhaya Libre', serif" }}
                            >
                                <i className="fas fa-users mr-2"></i>
                                පැමිණෙන්නන් ලියාපදිංචි කරන්න
                            </button>
                        </div>

                        <div className="flex items-center space-x-4 bg-amber-600/30 p-2 rounded-lg">
                            <div className="text-right border-r border-amber-500 pr-4">
                                <p className="font-semibold">පරිශීලක</p>
                                <p className="text-sm text-amber-200">අද: {new Date().toLocaleDateString('si-LK')}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center shadow-md">
                                    <span className="text-white font-bold">ප</span>
                                </div>
                                <button
                                    onClick={() => setIsLogoutModalOpen(true)}
                                    className="bg-amber-900 hover:bg-amber-950 text-amber-100 py-2 px-3 rounded-lg transition-colors flex items-center"
                                    title="Sign out"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span className="ml-2">පිටවන්න</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <LogOutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleSignOut}
            />
        </div>
    );
}

export default UserDbNavbar;
