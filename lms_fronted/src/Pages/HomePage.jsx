import { Link } from 'react-router-dom'
import HomeLayout from '../Layouts/HomeLayout.jsx';
import homePageImage2 from '../assets/Images/homePageImage2.svg'

const HomePage = () => {
  return (
    <>
      <HomeLayout>
        <div className='pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]'>
            <div className="w-1/2 space-y-6">
                <h1 className='text-3xl font-semibold'>
                    Find Out Best 
                    <span className='text-yellow-600 font-bold'>
                        Online Courses
                    </span>
                    <p className='text-lg text-gray-200 mt-3'>
                        We Have a large library of courses taught by highly skilled qualified faculties at a very affordable cost.
                    </p>

                    <div className='space-x-6 mt-3'>
                      <Link to="/courses">
                      <button className='text-lg bg-yellow-500 rounded-md text-center py-2 mt-3 px-5 font-semibold cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300'>
                        Explore Courses
                      </button>
                      </Link>

                      <Link to="/contact">
                      <button className='border border-yellow-500 text-lg rounded-md text-center py-2 mt-3 px-5 font-normal cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300'>
                        Contact Us
                      </button>
                      </Link>
                    </div>
                </h1>
            </div>

            <div className='w-1/2 flex items-center justify-center'>
                <img src={homePageImage2} alt="homePage Image" />
            </div>
        </div>
      </HomeLayout>
    </>
  )
}

export default HomePage
