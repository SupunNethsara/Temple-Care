import { useState } from "react";
import { LogOutModal } from "./LogOutModal.tsx";
import axios from "axios";

function UserDbNavbar() {
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSignOut = async () => {
        const response = await axios.post('http://localhost:8000/api/logout',
            {},
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Accept': 'application/json',
                }
            }
        );
        if (response.status === 200) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/';
        }
    };

    return (
        <div>
            <header className="bg-gradient-to-r from-amber-700 to-amber-800 text-white p-2 shadow-lg">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="flex items-center justify-between w-full md:w-auto">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-md overflow-hidden">
                                <img
                                    src="/logo.png"
                                    alt="Temple Logo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h1 className="text-lg md:text-xl lg:text-2xl font-bold hidden sm:block" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                                නිවුන්හැල්ල ශ්‍රී ශ්‍යිලබිම්බාරාම විහාරස්ථානය
                            </h1>
                        </div>

                        <button
                            className="md:hidden p-2 rounded-md text-amber-100 hover:bg-amber-600/30"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                    <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto`}>
                        <div className="flex flex-col sm:flex-row justify-center gap-2 w-full sm:w-auto">
                            <button
                                className="bg-amber-100 hover:bg-amber-200 text-amber-800 py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center w-full sm:w-auto"
                                style={{ fontFamily: "'Abhaya Libre', serif" }}
                            >
                                <i className="fas fa-donate mr-2"></i>
                                දානය ලියාපදිංචි කරන්න
                            </button>
                            <button
                                className="bg-amber-100 hover:bg-amber-200 text-amber-800 py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center w-full sm:w-auto"
                                style={{ fontFamily: "'Abhaya Libre', serif" }}
                            >
                                <i className="fas fa-users mr-2"></i>
                                පැමිණෙන්නන් ලියාපදිංචි කරන්න
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 bg-amber-600/30 p-3 rounded-lg w-full sm:w-auto">
                            <div className="text-center sm:text-right sm:border-r border-amber-500 sm:pr-4">
                                <p className="font-semibold">පරිශීලක</p>
                                <p className="text-sm text-amber-200">අද: {new Date().toLocaleDateString('si-LK')}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-600 rounded-full flex items-center justify-center shadow-md">
                                    <span className="text-white font-bold">ප</span>
                                </div>
                                <button
                                    onClick={() => setIsLogoutModalOpen(true)}
                                    className="bg-amber-900 hover:bg-amber-950 text-amber-100 py-2 px-3 rounded-lg transition-colors flex items-center"
                                    title="Sign out"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span className="ml-2 hidden xs:inline">පිටවන්න</span>
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
