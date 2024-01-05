import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    courseData: []
}

export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try {
        const response = await axiosInstance.get("/courses", {
            headers: {
                "Cache-Control": "no-cache"
            }
        });
        console.log(response.data.courses)
        toast.promise(Promise.resolve(response), {
            loading: "Loading Course Data...",
            success: "Course Loaded Successfully",
            error: "Failed to get the course"
        })
        return await response.data.courses;

    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message);
    }
});


// export const createNewCourse = createAsyncThunk("/course/create" , async (data)=>{
//     try {
//         const formData = new FormData();

//         formData.append("title" , data.title);
//         formData.append("description" , data.description);
//         formData.append("category" , data.category);
//         formData.append("createdBy" , data.createdBy);
//         formData.append("thumbnail" , data.thumbnail);

//         const response = axiosInstance.post('/courses',formData)
//         toast.promise({
//             loading : "Creating New Course",
//             success : "Course Created Successfully !!",
//             error : "Failed to create a course, try again later"
//         })

//         return (await response).data;


//     } catch (error) {
//         toast.error(error?.response?.data?.message); 
//     }
// })

export const createNewCourse = createAsyncThunk("/course/create", async (data) => {
    try {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("createdBy", data.createdBy);
        formData.append("thumbnail", data.thumbnail);

        const response = await axiosInstance.post('/courses', formData); // Added await here
        toast.success("Course Created Successfully !!"); // Display success message

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred while creating the course.");
            }
        } else {
            toast.error("An error occurred while creating the course.");
        }
    }
});


const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if (action.payload) {
                // console.log(action.payload)
                state.courseData = [...action.payload]
            }

        })
    }
})

export default courseSlice.reducer;