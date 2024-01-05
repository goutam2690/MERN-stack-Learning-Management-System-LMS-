import { createAsyncThunk, createSlice  } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance.jsx";
// import isAuthenticated from "../../Layouts/HomeLayout.jsx"

const initialState = {
    isAuthenticated : localStorage.getItem('isAuthenticated') || false,
    role : localStorage.getItem("role") || "",
    data : JSON.parse(localStorage.getItem("data")) || {}
}
// const initialState = {
//     isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' || false,
//     role: localStorage.getItem("role") || "",
//     data: JSON.parse(localStorage.getItem("data")) || {}
// }


export const createAccount = createAsyncThunk("/auth/signup", async (data)=>{
    try {
        const res = axiosInstance.post("users/register", data);
        toast.promise(res, {
            loading : "Wait, Creating Your Account",
            success : (data)=> {
                return data?.data?.message;
            },
            error : "Failed to create Account"
        });

        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const login = createAsyncThunk("/auth/login", async (data)=>{

    try {
        const res = axiosInstance.post("users/login", data);
         toast.promise(res, {
            loading : "Wait, Authentication in progress...",
            success : (data)=> {
                return data?.data?.message;
            },
            error : "Failed to Login"
        });
        console.log(res?.data?.user)
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const logout = createAsyncThunk("/auth/logout" , async()=>{
    try {
        const res = axiosInstance.post("users/logout");
        toast.promise(res, {
            loading : "Wait, Logout in progress...",
            success : (data)=> {
                return data?.data?.message;
            },
            error : "Failed to Logout, Please try later"
        });

        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);        
    }
})

export const updateUserProfile = createAsyncThunk("/user/update/profile" , async(data)=>{
    try {
        const res = axiosInstance.put(`users/update/${data[0]}`, data[1]);
        toast.promise(res, {
            loading : "Wait, Profile updation in progress...",
            success : (data)=> {
                return data?.data?.message;
            },
            error : "Failed to update profile"
        });

        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);        
    }
})

export const getUserData = createAsyncThunk("/user/details" , async()=>{
    try {
        const res = axiosInstance.get(`users/getMyProfile`);
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);        
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},
    extraReducers : (builder) => {
        builder
        .addCase(login.fulfilled, (state, action)=>{
            localStorage.setItem('data' , JSON.stringify(action?.payload?.user));
            localStorage.setItem("isAuthenticated", 'true');
            localStorage.setItem('role', action?.payload?.user?.role);
            state.isAuthenticated = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;            
        })
        .addCase(logout.fulfilled, (state)=>{
            localStorage.clear();
            state.data = {};
            state.role = "";
            state.isAuthenticated = false;
        })
        .addCase(getUserData.fulfilled, (state, action)=>{
            console.log(action);
            if(!action?.payload.user) return;
            localStorage.setItem('data' , JSON.stringify(action?.payload?.user));
            localStorage.setItem("isAuthenticated", 'true');
            localStorage.setItem('role', action?.payload?.user?.role);
            state.isAuthenticated = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;            
        })
    }
});

// export const {} = authSlice.actions;
export default authSlice.reducer;