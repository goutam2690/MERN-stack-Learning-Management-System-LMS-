// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom";

// import HomeLayout from "../../Layouts/HomeLayout";
// import { getUserData, updateUserProfile } from "../../Redux/slices/authSlice";
// import { BsPersonCircle } from 'react-icons/bs';


// const EditProfile = () => {

//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     // Get user data from redux store.
//     const [data, setData] = useState({
//         previewImage: "",
//         fullName: "",
//         avatar: undefined,
//         userId: useSelector((state) => state?.auth?.data?._id)
//     })


//     const handleImageUpload = (e) => {
//         e.preventDefault();
//         const uploadedImage = e.target.files[0];
//         if(uploadedImage){
//             const fileReader = new FileReader();
//             fileReader.readAsDataURL(uploadedImage);
//             fileReader.addEventListener('load' , ()=>{
//                 setData({
//                     ...data,
//                     previewImage : fileReader.result,
//                     avatar: uploadedImage
//                 })
//             })
//         }
//     }

//     const handleInputChange = (e) => {
//         const {name, value} = e.target;
//         setData({
//             ...data,
//             [name] : value
//         })
//     }

//     const onFormSubmit = async (e) => {
//         e.preventDefault();
//         if(!data.fullName || !data.avatar){
//             toast.error("All Fields Are Required");
//             return;
//         }

//         if(data.fullName.length < 5){
//             toast.error("Full Name should be atleast 5 characters");
//         }

//         const formData = new FormData();
//         formData.append("fullName" , data.fullName);
//         formData.append("avatar" , data.avatar);

//         await dispatch(updateUserProfile(data.userId, formData))
//         await dispatch(getUserData());

//         navigate("/profile");
//     }

//     return (
//     <>
//     <HomeLayout>
//         <div className="flex items-center justify-center h-[90vh]">
//             <form 
//                 onSubmit={onFormSubmit}
//                 className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_gray]"
//             >

//                 <h1 className="text-xl text-center font-semibold">Edit Profile</h1>
//                 <label 
//                     htmlFor="image_uploads"
//                     className="cursor-pointer"
//                 >
//                     {data.previewImage ? (
//                         <img 
//                             src={data.previewImage}
//                             className="rounded-fill m-auto w-28 h-28"
//                         />
//                     ) : (
//                         <BsPersonCircle className="w-28 h-28 m-auto rounded-fill"/>
//                     )}
//                 </label>

//                 <input 
//                     type="file" 
//                     className="hidden"
//                     id="image_uploads"
//                     onChange={handleImageUpload}
//                     name="image_uploads"
//                     accept=".jpg .png .svg .jpeg"
//                 />

//                 <div className="flex flex-col gap-3">
//                     <label htmlFor="fullName" className="text-lg font-semibold">Full Name</label>
//                     <input 
//                         type="text" 
//                         name="fullName" 
//                         id="fullName" 
//                         placeholder="Enter Your Name" 
//                         className="bg-transparent px-2 py-1 border rounded-md" 
//                         value={data.fullName} 
//                         onChange={handleInputChange}/>
//                 </div>
//             </form>
//         </div>
//     </HomeLayout>
//     </>
//   )
// }

// export default EditProfile


import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData, updateUserProfile } from "../../Redux/slices/authSlice";
import { BsPersonCircle } from 'react-icons/bs';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    previewImage: "", // For displaying a preview of the selected image
    fullName: "",
    avatar: undefined, // The actual file object
    userId: useSelector((state) => state?.auth?.data?._id),
  });

  const handleImageUpload = (e) => {
    e.preventDefault();
    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      // Use FileReader to read the file and generate a data URL
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);

      fileReader.onload = () => {
        setData({
          ...data,
          previewImage: fileReader.result,
          avatar: uploadedImage, // Store the actual file object
        });
      };
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    
    const image_uploads_error = document.getElementById('input_image');
    if(!data.avatar){
        toast.error("Please upload image");
        image_uploads_error.style.width = '96px';
        image_uploads_error.style.height = '96px';
        image_uploads_error.style.border = '7px solid red';
        image_uploads_error.style.borderRadius = '100%';
        image_uploads_error.style.margin = 'auto';
        return;
    }


    if (!data.fullName || !data.avatar) {
      toast.error("All Fields Are Required");
      return;
    }

    if (data.fullName.length < 5) {
      toast.error("Full Name should be at least 5 characters");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);

    try {
      // Update user profile with the new data
      await dispatch(updateUserProfile([data.userId, formData]));

      // Fetch updated user data
      await dispatch(getUserData());

      // Navigate to the user profile page
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile. Please try again.");
    }
  };

  return (
    <>
      <HomeLayout>
        <div className="flex items-center justify-center h-[90vh]">
          <form
            onSubmit={onFormSubmit}
            className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_gray]"
          >
            <h1 className="text-xl text-center font-semibold">Edit Profile</h1>
            <label htmlFor="image_uploads" className="cursor-pointer">
              {data.previewImage ? (
                <img
                  src={data.previewImage}
                  alt="Preview"
                  className="rounded-fill m-auto w-28 h-28"
                />
              ) : (
                <BsPersonCircle className="w-28 h-28 m-auto rounded-fill" id="input_image" />
              )}
            </label>
            <input
              type="file"
              className="hidden"
              id="image_uploads"
              onChange={handleImageUpload}
              name="image_uploads"
              accept=".jpg, .png, .svg, .jpeg"
            />
            <div className="flex flex-col gap-3">
              <label htmlFor="fullName" className="text-lg font-semibold">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Enter Your Name"
                className="bg-transparent px-2 py-1 border rounded-md"
                value={data.fullName}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 py-1 rounded-md font-semibold">
                Update Profile
            </button>
          </form>
        </div>
      </HomeLayout>
    </>
  );
};

export default EditProfile;
