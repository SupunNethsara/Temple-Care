function Home() {
    return (
        <div className="relative w-full min-h-screen flex justify-center items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="/background.jpg"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60"></div>
            </div>
            <div className="relative flex flex-col lg:flex-row z-10 text-white w-full max-w-7xl px-4 md:px-8 py-8 md:py-12">
                <div className='w-full lg:w-4/5 lg:pr-10 flex flex-col justify-center mb-8 lg:mb-0'>
                    <h1 className="text-3xl mt-12 sm:text-5xl md:text-6xl lg:text-7xl lg:mt-0 w-full font-bold mb-2 text-amber-300" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                        නිවුන්හැල්ල ශ්‍රී ශ්‍යිලබිම්බාරාම
                    </h1>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6 text-amber-200" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                        විහාරස්තානය
                    </h2>
                    <p className="text-lg sm:text-xl sm:w-full md:text-2xl w-full lg:w-3/4 leading-relaxed md:leading-8 text-justify" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                        මනුෂ්‍ය ජීවිතය අපට ලැබෙන දුර්ලභ අරමුනකි. මේ ජීවිතය භාවිතා කළ යුත්තේ සත්‍යය සොයා ගැනීමටයි.
                        සතර ආර්ය සත්‍යය තේරුම් ගත්විට දුකින් මිදීමේ මඟ අපට දකින්නට හැකිවේ.
                        සසර ගමනෙහි සියලු සම්පත්, ගෞරව, අරමුණු අනිත්‍ය බව සොයා දකින්න.
                        මනුෂ්‍යත්වය, කරුණාව, මෛත්‍රී ගොඩනගා ගත යුත්තේ සදාකාලික සතුට සෙවීම පිණිසයි.
                    </p>
                    <div className="mt-6">
                        <button
                            className="bg-[#FF9D00] hover:bg-[#FFAA20] text-white font-sinhala font-semibold py-2 px-6 md:py-3 md:px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 text-base md:text-lg"
                            style={{ boxShadow: '0 4px 14px 0 rgba(255, 157, 0, 0.4)' }}
                        >
                            වැඩි විස්තර
                        </button>
                    </div>
                </div>

                <div className='w-full lg:w-2/5 lg:pl-10 flex flex-col justify-center space-y-4 md:space-y-6 lg:space-y-8'>
                    <div className="text-center italic text-amber-100/90 p-4 md:p-6 border border-amber-400/30 rounded-xl md:rounded-2xl bg-black/20 backdrop-blur-sm">
                        <p className="text-lg md:text-xl" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                            "අප්පමාදො අමතපදං - පමාදො මච්චුනො පදං"
                        </p>
                        <p className="text-xs md:text-sm mt-2 text-amber-200/80">
                            - ධම්මපදය
                        </p>
                    </div>

                    <div className="text-center italic text-amber-100/90 p-4 md:p-6 border border-amber-400/30 rounded-xl md:rounded-2xl bg-black/20 backdrop-blur-sm">
                        <p className="text-lg md:text-xl" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                            "සබ්බපාපස්ස අකරණං - කුසලස්ස උපසම්පදා"
                        </p>
                        <p className="text-xs md:text-sm mt-2 text-amber-200/80">
                            - ධම්මපදය
                        </p>
                    </div>

                    <div className="text-center italic text-amber-100/90 p-4 md:p-6 border border-amber-400/30 rounded-xl md:rounded-2xl bg-black/20 backdrop-blur-sm">
                        <p className="text-lg md:text-xl" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                            "න හි වෙරෙන වෙරානි - සම්මන්තීධ කුදාචනං"
                        </p>
                        <p className="text-xs md:text-sm mt-2 text-amber-200/80">
                            - ධම්මපදය
                        </p>
                    </div>

                    <div className="text-center italic text-amber-100/90 p-4 md:p-6 border border-amber-400/30 rounded-xl md:rounded-2xl bg-black/20 backdrop-blur-sm">
                        <p className="text-lg md:text-xl" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                            "අත්තානං චෙ පඨමං පතිරූපෙ - නිවාතෙ ජිනෙය්‍ය අථ ඤ්ඤමනුසාසෙය්‍ය"
                        </p>
                        <p className="text-xs md:text-sm mt-2 text-amber-200/80">
                            - ධම්මපදය
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
