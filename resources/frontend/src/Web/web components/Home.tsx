function Home() {
    return (
        <div className="relative w-full h-screen flex justify-center items-center ">
            <div className="absolute inset-0 z-0">
                <img
                    src="/background.jpg"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            <div className="relative flex  z-10 text-white ">
                <div className='w-1/2'>

                </div>
                <div className='w-1/2'>
                    <img src="" alt="" />
                </div>
            </div>
        </div>
    );
}

export default Home;
