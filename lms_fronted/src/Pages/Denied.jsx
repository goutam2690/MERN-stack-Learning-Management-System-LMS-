import { useNavigate } from "react-router-dom";

const Denied = () => {

    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(-1)} className='h-screen w-full bg-[#1a2238] flex flex-col justify-center items-center'>
            <h1 className='text-9xl font-extrabold text-white tracking-widest'>403</h1>

            <div className="bg-black text-white gap-2 text-md font-serif mb-10 rounded rotate-12 absolute">
                Access Denied
            </div>

            <button className="mt-5 text-white">
                <a className="relative inline-block text-sm font-medium text-[#FF6A3D] gropu active:text-yellow-500 focus:outline-none focus:ring"><span onClick={() => navigate(-1)} className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                    Go Back </span></a>
            </button>
        </div>
    )
}

export default Denied
