function Home() {
    return (
        <div className="relative w-full h-screen flex justify-center items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="/background.jpg"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60"></div>
            </div>
            <div className="relative flex z-10 text-white w-full max-w-7xl">
                <div className='w-4/5 pr-10 flex flex-col justify-center'>
                    <h1 className="text-7xl w-full font-bold mb-2 text-amber-300" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                        නිවුන්හැල්ල ශ්‍රී ශ්‍යිලබිම්බාරාම
                    </h1>
                    <h2 className="text-5xl mb-6 text-amber-200" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                        විහාරස්තානය
                    </h2>
                    <p className="text-2xl w-3/4 leading-8 text-justify" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                        මනුෂ්‍ය ජීවිතය අපට ලැබෙන දුර්ලභ අරමුනකි. මේ ජීවිතය භාවිතා කළ යුත්තේ සත්‍යය සොයා ගැනීමටයි.
                        සතර ආර්ය සත්‍යය තේරුම් ගත්විට දුකින් මිදීමේ මඟ අපට දකින්නට හැකිවේ.
                        සසර ගමනෙහි සියලු සම්පත්, ගෞරව, අරමුණු අනිත්‍ය බව සොයා දකින්න.
                        මනුෂ්‍යත්වය, කරුණාව, මෛත්‍රී ගොඩනගා ගත යුත්තේ සදාකාලික සතුට සෙවීම පිණිසයි.
                    </p>
                    <div className="mt-6">
                        <button
                            className="bg-[#FF9D00] hover:bg-[#FFAA20] text-white font-sinhala font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                            style={{ boxShadow: '0 4px 14px 0 rgba(255, 157, 0, 0.4)' }}
                        >
                            වැඩි විස්තර
                        </button>
                    </div>
                </div>

                <div className='w-2/5 pl-10 flex flex-col justify-center space-y-8'>
                    <div className="text-center italic text-amber-100/90 p-6 border border-amber-400/30 rounded-2xl bg-black/20 backdrop-blur-sm">
                        <p className="text-xl" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                            "අප්පමාදො අමතපදං - පමාදො මච්චුනො පදං"
                        </p>
                        <p className="text-sm mt-2 text-amber-200/80">
                            - ධම්මපදය
                        </p>
                    </div>

                    <div className="text-center italic text-amber-100/90 p-6 border border-amber-400/30 rounded-2xl bg-black/20 backdrop-blur-sm">
                        <p className="text-xl" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                            "සබ්බපාපස්ස අකරණං - කුසලස්ස උපසම්පදා"
                        </p>
                        <p className="text-sm mt-2 text-amber-200/80">
                            - ධම්මපදය
                        </p>
                    </div>

                    <div className="text-center italic text-amber-100/90 p-6 border border-amber-400/30 rounded-2xl bg-black/20 backdrop-blur-sm">
                        <p className="text-xl" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                            "න හි වෙරෙන වෙරානි - සම්මන්තීධ කුදාචනං"
                        </p>
                        <p className="text-sm mt-2 text-amber-200/80">
                            - ධම්මපදය
                        </p>
                    </div>

                    <div className="text-center italic text-amber-100/90 p-6 border border-amber-400/30 rounded-2xl bg-black/20 backdrop-blur-sm">
                        <p className="text-xl" style={{ fontFamily: "'Abhaya Libre', serif" }}>
                            "අත්තානං චෙ පඨමං පතිරූපෙ - නිවාතෙ ජිනෙය්‍ය අථ ඤ්ඤමනුසාසෙය්‍ය"
                        </p>
                        <p className="text-sm mt-2 text-amber-200/80">
                            - ධම්මපදය
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
