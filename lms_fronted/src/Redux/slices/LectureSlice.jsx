import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosInstance';

const initialState = {
    lectures : []
}


export const getCourseLecture = createAsyncThunk("course/lecture/get", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/courses/${id}`);
        console.log(response);

        if (response.status === 200) {
            toast.success("Lectures fetched successfully");
            return response.data;
        } else {
            toast.error("Failed to load the lectures, try again");
            return rejectWithValue(response.data); // This will trigger the "rejected" state with the provided value
        }
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data); // This will trigger the "rejected" state with the provided value
    }
});


export const addCourseLecture = createAsyncThunk("/course/lecture/add" , async (data)=>{
    try {

        const formData = new FormData();
        formData.append("lecture", data.lecture);
        formData.append("title", data.title);
        formData.append("description" , data.description);

        const response = axiosInstance.post(`/courses/${data.id}`, formData);
        toast.promise(response, {
            loading : "Adding course lectures, Please wait...",
            success : "Lecture added successfully",
            error : "failed to add the lecture, try again"
        })
        return (await response).data; 
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

// export const deleteCourseLecture = createAsyncThunk("/course/lecture/delete" , async (data)=>{
//     try {
//         const response = await axiosInstance.delete(`/courses`, { params: data });
//         toast.promise(response, {
//             loading : "Deleting course lectures, Please wait...",
//             success : "Lecture deleted successfully",
//             error : "failed to delete the lecture, try again"
//         })
//         return response.data; 
//     } catch (error) {
//         console.log(error)
//         toast.error(error?.response?.data?.message)
//     }
// })

export const deleteCourseLecture = createAsyncThunk("/course/lecture/delete", async(data, {rejectWithValue})=>{
    try {
        const response = await axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`);
        toast.promise(response, {
            loading : "deleting course lecture",
            success : "lecture deleted successfully",
            error : "failed to delete lecture"
        })
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error.response.data);
        
    }
})

const lectureSlice = createSlice({
    name : "Lecture",
    initialState,
    reducers : {},
    extraReducers : (builder) =>{
        builder.addCase(getCourseLecture.fulfilled, (state, action)=>{
            console.log(action);
            state.lectures = action?.payload?.lectures
        })
        .addCase(addCourseLecture.fulfilled, (state, action)=>{
            console.log(action);
            state.lectures = action?.payload?.course?.lectures
        })
    }
})

export default lectureSlice.reducer;