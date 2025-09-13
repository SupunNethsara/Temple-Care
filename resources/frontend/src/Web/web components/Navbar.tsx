import { useState } from 'react';
import type { NavbarProps } from "../../Utils/PropTypes";

function Navbar({ onOpenLogin, onOpenRegister }:NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-4 py-3 sm:px-6 sm:py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center p-2 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 shadow-lg">
                <div className="flex items-center">
                    <img src="/logo.png" className='w-12 h-12 sm:w-16 sm:h-16 object-contain' alt="Logo" />
                    <span className="h-6 sm:h-8 w-px bg-white/40 mx-2 sm:mx-4"></span>
                    <div
                        className="text-white text-sm sm:text-lg font-semibold tracking-wider"
                        style={{ fontFamily: "'Abhaya Libre', serif" }}
                    >
                        DHAMMA
                    </div>
                </div>

                <div className="hidden md:flex space-x-4 lg:space-x-8">
                    <a href="#" className="text-white hover:text-amber-300 transition-colors text-base lg:text-xl py-2 px-2 lg:px-3 rounded-md hover:bg-white/5" style={{ fontFamily: "'Abhaya Libre', serif" }}>මුල් පිටුව</a>
                    <a href="#" className="text-white hover:text-amber-300 transition-colors text-base lg:text-xl py-2 px-2 lg:px-3 rounded-md hover:bg-white/5" style={{ fontFamily: "'Abhaya Libre', serif" }}>පිළිබඳව</a>
                    <a href="#" className="text-white hover:text-amber-300 transition-colors text-base lg:text-xl py-2 px-2 lg:px-3 rounded-md hover:bg-white/5" style={{ fontFamily: "'Abhaya Libre', serif" }}>නවතම</a>
                    <a href="#" className="text-white hover:text-amber-300 transition-colors text-base lg:text-xl py-2 px-2 lg:px-3 rounded-md hover:bg-white/5" style={{ fontFamily: "'Abhaya Libre', serif" }}>සම්බන්ධ වන්න</a>
                </div>

                <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
                    <button onClick={onOpenLogin} className="text-white hover:text-amber-300 transition-colors py-1.5 px-3 lg:py-2 lg:px-4 rounded-md hover:bg-white/5 text-sm lg:text-base" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                        පිවිසෙන්න
                    </button>
                    <button onClick={onOpenRegister} className="bg-[#ff9d00] text-white py-1.5 px-4 lg:py-2 lg:px-6 rounded-md hover:bg-amber-700 transition-colors shadow-md text-sm lg:text-base" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                        ලියාපදිංචි
                    </button>
                </div>

                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white focus:outline-none"
                    >
                        {isMenuOpen ? (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg border-t border-white/10 py-4 px-6">
                    <div className="flex flex-col space-y-4">
                        <a href="#" className="text-white hover:text-amber-300 transition-colors text-lg py-3 px-4 rounded-md hover:bg-white/10" style={{ fontFamily: "'Abhaya Libre', serif" }}>මුල් පිටුව</a>
                        <a href="#" className="text-white hover:text-amber-300 transition-colors text-lg py-3 px-4 rounded-md hover:bg-white/10" style={{ fontFamily: "'Abhaya Libre', serif" }}>පිළිබඳව</a>
                        <a href="#" className="text-white hover:text-amber-300 transition-colors text-lg py-3 px-4 rounded-md hover:bg-white/10" style={{ fontFamily: "'Abhaya Libre', serif" }}>නවතම</a>
                        <a href="#" className="text-white hover:text-amber-300 transition-colors text-lg py-3 px-4 rounded-md hover:bg-white/10" style={{ fontFamily: "'Abhaya Libre', serif" }}>සම්බන්ධ වන්න</a>

                        <div className="pt-4 border-t border-white/20 flex flex-col space-y-3">
                            <button onClick={onOpenLogin} className="text-white hover:text-amber-300 transition-colors py-3 px-4 rounded-md hover:bg-white/10 text-lg" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                                පිවිසෙන්න
                            </button>
                            <button onClick={onOpenRegister} className="bg-[#ff9d00] text-white py-3 px-4 rounded-md hover:bg-amber-700 transition-colors text-lg" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                                ලියාපදිංචි
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
