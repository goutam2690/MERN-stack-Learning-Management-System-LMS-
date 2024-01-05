import { useLocation, useNavigate } from "react-router-dom"
import HomeLayout from "../../Layouts/HomeLayout.jsx"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addCourseLecture } from "../../Redux/slices/LectureSlice.jsx";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowLeft } from "react-icons/ai";

function AddLecture() {

    const courseDetails = useLocation().state;
//     const { state } = useLocation();
//   const { lectures } = useSelector((state) => state.lecture);

    console.log("course Details",courseDetails)
    // console.log("state",state )
    // console.log("lectures",lectures)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userInput, setUserInput] = useState({
        id: courseDetails._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: ""
    })

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    function handleVideo(e) {
        const video = e.target.files[0];
        const source = window.URL.createObjectURL(video);
        console.log(source)
        setUserInput({
            ...userInput,
            videoSrc: source,
            lecture: video
        })

    }

    async function onFormSubmit(e) {
        e.preventDefault();

        if (!userInput.title || !userInput.description || !userInput.lecture) {
            toast.error("All fields are required ");
            return;
        }

        const response = await dispatch(addCourseLecture(userInput))
        if (response?.payload?.success) {
          navigate(-1)
            setUserInput({
                id: courseDetails._id,
                lecture: undefined,
                title: "",
                description: "",
                videoSrc: ""
            })
        }
    }
    

    useEffect(() => {
        if (!courseDetails) navigate("/courses")
    }, [])

    return (
        <HomeLayout>
           <div className="min-h-screen flex flex-col items-center justify-center gap-10 mx-4 md:mx-8 lg:mx-16 ">
        <div className="flex flex-col gap-5 p-4 md:p-6 rounded-lg w-full md:w-[60%] lg:w-[50%] xl:w-[40%] mx-auto shadow-[0_0_10px_teal]">
          <header className="flex items-center justify-center relative mb-4">
            <button
              className="absolute left-4 top-4 text-xl text-green-500"
              onClick={() => navigate(-1)}
            >
              <AiOutlineArrowLeft />
            </button>
            <h1 className="text-xl md:text-2xl text-yellow-500 font-semibold px-4 md:px-10">
              Add New Lecture
            </h1>
          </header>

          <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="title"
              placeholder="Enter the title"
              onChange={handleInputChange}
              className="bg-transparent border px-4 py-2 rounded-md text-white"
              value={userInput.title}
            />
            <input
              type="text"
              name="description"
              placeholder="Enter the description"
              onChange={handleInputChange}
              className="bg-transparent border resize-none overflow-y-scroll h-28 rounded-md text-white"
              value={userInput.description}
            />
            {userInput.videoSrc ? (
              <video
                muted
                src={userInput.videoSrc}
                controls
                className="object-fill rounded-md w-full"
              ></video>
            ) : (
              <div className="h-48 border flex items-center justify-center cursor-pointer">
                <label
                  htmlFor="lecture"
                  className="font-semibold text-xl cursor-pointer text-white"
                >
                  (Choose your video)
                </label>
                <input
                  type="file"
                  id="lecture"
                  name="lecture"
                  onChange={handleVideo}
                  accept="video/mp4 video/x-mp4 video/*"
                  className="hidden"
                />
              </div>
            )}

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Add New Lecture
            </button>
          </form>
        </div>
      </div>

        </HomeLayout>
    )
}

export default AddLecture