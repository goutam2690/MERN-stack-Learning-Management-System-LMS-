import { Link, useNavigate } from "react-router-dom"
import HomeLayout from "../../Layouts/HomeLayout"
import { useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { createNewCourse } from "../../Redux/slices/courseSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

const CreateCourse = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    category: "",
    createdBy: "",
    thumbnail: null,
    previewImage: ""
  });

  const handleImageUpload = (e) => {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener('load', () => {
        setUserInput({
          ...userInput,
          previewImage: fileReader.result,
          thumbnail: uploadedImage
        })
      })
    }
  }

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value
    })
  }

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.title || !userInput.description || !userInput.category || !userInput.createdBy || !userInput.thumbnail) {
      toast.error("All fields are required");
      return
    }

    if(userInput.title.length < 5){
      toast.error("Course Title must be atleast 5 characters");
      return;
    }

    if(userInput.createdBy.length < 3){
      toast.error("Course Instructor name must be atleast 3 characters");
      return;
    }

    if(userInput.category.length < 5){
      toast.error("Course category must be atleast 5 characters");
      return;
    }

    if(userInput.description.length < 5){
      toast.error("Course description must be atleast 5 characters");
      return;
    }

    if(userInput.description.length > 70){
      toast.error("Course description must be less than 70 characters")
      return;
    }

    const response = await dispatch(createNewCourse(userInput));
    if (response?.payload?.success) {
      setUserInput({
        title: "",
        description: "",
        category: "",
        createdBy: "",
        thumbnail: null,
        previewImage: ""
      })
    }
    navigate("/courses");
  }


  return (
    <>
      <HomeLayout>
        <div className="flex items-center justify-center h-[90vh]">
          <form
            onSubmit={onFormSubmit}
            className="flex flex-col justify-center p-4 text-white w-[700px] gap-5 rounded-lg shadow-[0_0_10px_gray] relative"
          >
            <h1 className="text-center text-2xl font-serif py-2 ">Create New Course</h1>

            <Link className="text-2xl link text-accent cursor-pointer">
              <AiOutlineArrowLeft />
            </Link>

            <main className="grid grid-cols-2 gap-x-10">
              <div className="gap-y-6">
                <div>
                  <label className="cursor-pointer" htmlFor="image_uploads">
                    {userInput?.previewImage ? (
                      <img
                        src={userInput.previewImage}
                        className="w-full h-44 m-auto border" />)
                      : (
                        <div className="w-full h-44 m-auto flex items-center justify-center border">
                          <h1 className="font-normal text-md">Upload your course thumbnail <div className="text-center">(click here)</div></h1>
                        </div>
                      )}
                  </label>

                  <input
                    type="file"
                    className="hidden"
                    id="image_uploads"
                    accept=".png,.jpg,.jpeg"
                    name="image_uploads"
                    onChange={handleImageUpload}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="title" className="text-md font-thin mt-2"> Course Title </label>

                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter Course Title"
                    className="bg-transparent border py-1 rounded-sm p-2"
                    value={userInput.title}
                    onChange={handleUserInput}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-1">
                  <label htmlFor="createdBy" className="text-md font-thin"> Course Instructor </label>

                  <input
                    type="text"
                    name="createdBy"
                    id="createdBy"
                    placeholder="Enter Course Instructor"
                    className="bg-transparent border py-1 rounded-sm p-2"
                    value={userInput.createdBy}
                    onChange={handleUserInput}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="category" className="text-md font-thin mt-2"> Course Category </label>

                    <input
                      type="text"
                      name="category"
                      id="category"
                      placeholder="Enter Course Category"
                      className="bg-transparent border py-1 rounded-sm p-2"
                      value={userInput.category}
                      onChange={handleUserInput}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="description" className="text-md font-thin mt-2"> Course Description </label>

                    <textarea
                      type="text"
                      name="description"
                      id="description"
                      placeholder="Enter Course Description"
                      className="bg-transparent border py-1 rounded-sm p-2 overflow-y-scroll resize-none h-24"
                      value={userInput.description}
                      onChange={handleUserInput}
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>


            </main>

            <button className="w-[100%] bg-yellow-500 py-2 hover:bg-yellow-600 transition-all ease-in-out duration-300 font-bold cursor-pointer">
              Create Course
            </button>

          </form>
        </div>
      </HomeLayout>

    </>
  )
}

export default CreateCourse
