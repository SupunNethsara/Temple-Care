function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center p-2 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10 shadow-lg">
                <div className="flex items-center">
                    <img src="/logo.png" className='w-16 h-16 object-contain' alt="Logo" />
                    <span className="h-8 w-px bg-white/40 mx-4"></span>
                    <div className="text-white text-lg font-semibold tracking-wider">DHAMMA</div>
                </div>

                <div className="hidden md:flex space-x-8">
                    <a href="#" className="text-white hover:text-amber-300 transition-colors font-sinhala text-lg py-2 px-3 rounded-md hover:bg-white/5">මුල් පිටුව</a>
                    <a href="#" className="text-white hover:text-amber-300 transition-colors font-sinhala text-lg py-2 px-3 rounded-md hover:bg-white/5">පිළිබඳව</a>
                    <a href="#" className="text-white hover:text-amber-300 transition-colors font-sinhala text-lg py-2 px-3 rounded-md hover:bg-white/5">නවතම</a>
                    <a href="#" className="text-white hover:text-amber-300 transition-colors font-sinhala text-lg py-2 px-3 rounded-md hover:bg-white/5">සම්බන්ධ වන්න</a>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="text-white hover:text-amber-300 transition-colors font-sinhala py-2 px-4 rounded-md hover:bg-white/5">
                        පිවිසෙන්න
                    </button>
                    <button className="bg-amber-600 text-white font-sinhala py-2 px-6 rounded-md hover:bg-amber-700 transition-colors shadow-md">
                        ලියාපදිංචි
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
