import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../Redux/slices/courseSlice.jsx';
import HomeLayout from '../../Layouts/HomeLayout.jsx';
import CourseCard from '../../Components/CourseCard.jsx';

const CourseList = () => {
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);

  const loadCourses = () => {
    try {
      dispatch(getAllCourses());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { 
    loadCourses();
  }, []);

  // if (!courseData) {
  //   return <div>Loading...</div>; // Handle the loading state
  // }

  // if (courseData.length === 0) {
  //   return <div>No courses available</div>; // Handle the case where no courses are available
  // }
  // console.log("length of course:"+courseData.length)

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
        <h1 className='text-center font-semibold text-xl'>
          Explore the courses made by-
          <span className="text-yellow-500 font-bold"> Industry Experts </span>
        </h1>
        <div className="flex flex-wrap gap-10">
          {courseData?.map((element) => {
            return <CourseCard key={element._id} data={element} />;
          })}
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseList;
