import React from 'react'
import { useNavigate } from 'react-router-dom'

const CourseCard = ({data}) => {

    const navigate = useNavigate();
    return (
        <div onClick={() => navigate("/course/course-details", {state : {...data}})}
            className='text-white w-[22rem] shadow-lg rounded-lg cursor-pointer group overflow-hidden'>
            <div className='overflow-hidde border'>
                <img
                    className='h-40 w-full rounded-tr-lg group-hover:scale-[1,2] transition-all ease-in-out duration-300'
                    src={data?.thumbnail?.secure_url}
                    alt='course thumbnail'
                />
                <div className='p-3 space-y-1 text-white'>
                    <h2 className='text-xl font-semibold text-yellow-500 line-clamp-2'>{data?.title}</h2>
                    <p className='line-clamp-2 text-sm'><span className='text-yellow-500'>Description : </span> {data?.description}</p>
                    <p className=''>
                        <span className='text-yellow-500 text-sm'>Category : </span>
                        {data?.category}
                    </p>

                    <p className=''>
                        <span className='text-yellow-500 text-sm'>Total Lectures : </span>
                        {data?.numberOfLectures}
                    </p>

                    <p className=''>
                        <span className='text-yellow-500 text-sm'>Instructor : </span>
                        {data?.createdBy}
                    </p>


                </div>


            </div>

        </div>
    )
}

export default CourseCard
