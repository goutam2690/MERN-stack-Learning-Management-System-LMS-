import { AiFillCloseCircle } from 'react-icons/ai';
import { FcMenu } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';

import Footer from '../Components/Footer.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/slices/authSlice.jsx';

const HomeLayout = ({ children }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //for checking if user is logged in
    const isAuthenticated = useSelector((state)=>state?.auth?.isAuthenticated);

    //for displaying the options
    const role = useSelector((state)=> state?.auth?.role);


    const changeWidth = () => {
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = "auto";
    }

    const hideDrawer = () => {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;

        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = "0";        
    }

    const handleLogout = async(e) => {
        e.preventDefault();

        const res = await dispatch(logout());        
        if(res?.payload?.success)
        navigate("/");
    }

    return (
        <>
            <div className="min-h-[90vh] bg-gray-800">
                <div className="drawer absolute left-0 w-fit ">
                    <input className="drawer-toggle" id="my-drawer-2" type="checkbox" />
                    <div className="drawer-content" >
                        <label htmlFor="my-drawer-2" className="cursor-pointer relative">
                            <div onClick={changeWidth}>
                                <FcMenu size={"32px"} className="font-bold text-white m-4" />
                            </div>
                        </label>
                    </div>

                    <div className="drawer-side w-0">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-48 h-[90%] sm:w-80 relative bg-gray-900 text-white">
                            <li className='w-fit absolute right-2 z-50'>
                                <button onClick={hideDrawer} className='hover:text-white hover:border-white'>
                                    <AiFillCloseCircle size={"24px"} />
                                </button>
                            </li>

                            <li>
                                <Link className="hover:text-white hover:bg-gray-500" to="/">Home</Link>
                            </li>

                            {isAuthenticated && role==="ADMIN" && (
                                <li>
                                    <Link className="hover:text-white hover:bg-gray-500" to="/admin/dashboard">Admin Dashboard</Link>
                                    <Link className="hover:text-white hover:bg-gray-500" to="/course/create">Create Course</Link>

                                </li>
                                
                            )}

                            <li>
                                <Link className="hover:text-white hover:bg-gray-500" to="/courses">Courses</Link>
                            </li>
                            <li>
                                <Link className="hover:text-white hover:bg-gray-500" to="/contact">Contact</Link>
                            </li>
                            <li>
                                <Link className="hover:text-white hover:bg-gray-500" to="/aboutus">About us</Link>
                            </li>

                            {!isAuthenticated && (
                                <li className='w-[90%] '>
                                <div className="w-full flex items-center justify-center">
                                    <button className='btn-primary px-4 py-1 font-semibold rounded-md w-full'>
                                        <Link to="/login">Login</Link>
                                    </button>
                                    <button className='btn-secondary px-4 py-1 font-semibold rounded-md w-full'>
                                        <Link to="/signup">Signup</Link>
                                    </button>
                                </div>
                                </li>
                            )}

                            {isAuthenticated && (
                                <li className='w-[90%]'>
                                <div className="w-full flex">
                                    <button className='btn-primary px-4 py-1 font-semibold rounded-md w-full'>
                                        <Link to="/profile">Profile</Link>
                                    </button>
                                    <button className='btn-secondary px-4 py-1 font-semibold rounded-md w-full'>
                                        <Link onClick={handleLogout}>Logout</Link>
                                    </button>
                                </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

              
                {children}

                <Footer />
            </div>
        </>
    )
}

export default HomeLayout;
