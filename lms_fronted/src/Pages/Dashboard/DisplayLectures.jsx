import React, { useEffect, useState } from 'react'
import HomeLayout from '../../Layouts/HomeLayout.jsx'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourseLecture, getCourseLecture } from '../../Redux/slices/LectureSlice.jsx';

const DisplayLectures = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth)
  const [currentVideo, setCurrentVideo] = useState(0);
  console.log(lectures)
  async function onLectureDelete(courseId, lectureId) {
    console.log(courseId, lectureId)
    await dispatch(deleteCourseLecture({ courseId: courseId, lectureId: lectureId }));
    // await dispatch(getCourseLecture(courseId));
  }

  useEffect(() => {
    console.log(state)
    if (!state) navigate("/courses");
    dispatch(getCourseLecture(state._id))
    // console.log("lectuiresjsdhjhg : ", lectures && lectures[currentVideo]?.lecture?.secure_url)
  }, []);


  return (
    <HomeLayout>

      <div className='flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white'>
        <div className='text-center text-xl font-semibold text-yellow-500 py-3 px-3'>
          Course Name : {state?.title}
        </div>

        {lectures && lectures.length > 0 ? <div className='flex justify-center gap-10 w-full'>
          {/* left section for playing videos and displaying course details to admIN  */}
          <div className='space-y-5 w-[40rem] p-2 rounded-lg shadow-[0_0_10px_gray]'>
            <video
              src={lectures && lectures[currentVideo]?.lecture?.secure_url}
              className='object-fill rounded-tl-lg rounded-tr-lg w-full'
              controls
              disablePictureInPicture
              controlsList='nodownload'
            >
            </video>
            <div>
              <h1>
                <span className='text-teal-500 text-lg'>Title : {" "}
                </span>
                {lectures && lectures[currentVideo]?.title}

              </h1>
              <p>
                <span className='text-teal-500'>Description : {" "}
                </span>
                {lectures && lectures[currentVideo]?.description}
              </p>
            </div>
          </div>

          {/* right section for displaying list of lectures  */}
          <ul className='w-[25rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-3'>
            <li className='font-semibold text-xl text-yellow-500 flex items-center justify-between'>
              <p>Lectures List : </p>
              {role === "ADMIN" &&
                <button className='btn btn-primary btn-sm' onClick={() => navigate("/course/addNewLecture", { state: { ...state } })}>
                  Add New Lecture
                </button>
              }
            </li>
            {
              lectures &&
              lectures.map((lecture, idx) => {
                return (
                  <li className='space-y-2 ' key={lecture._id}>
                    <p className='cursor-pointer space-y-4  px-4 hover:bg-blue-950' onClick={() => setCurrentVideo(idx)}>
                      <span>
                        {" "} Lectures {idx + 1} : {" "}
                      </span>
                      {lecture?.title}
                    </p>
                    {role === "ADMIN" &&
                      <button onClick={() => onLectureDelete(state?._id, lecture?._id)} className='btn btn-accent rounded-2xl btn-xs'>
                        Delete Lecture
                      </button>
                    }
                  </li>
                )
              })
            }
          </ul>

        </div> : <>
          <p className='text-xl font-sans'>No Lectures available regarding this course</p>
          <div className='flex flex-row items-center justify-center gap-10'>
            {role === "ADMIN" &&              
               <button
               className='btn btn-primary btn-md rounded-none'
               onClick={() => navigate("/course/addNewLecture", { state: { ...state } })}
             >
               Add New Lecture
             </button>
                          

            }

            <a className="relative inline-block text-sm font-medium text-[#FF6A3D] gropu active:text-yellow-500 focus:outline-none focus:ring cursor-pointer">
              <span onClick={() => navigate(-1)} className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                Go Back
              </span>
            </a>
          </div>
        </>
        }

      </div>

    </HomeLayout>
  )
}

export default DisplayLectures
