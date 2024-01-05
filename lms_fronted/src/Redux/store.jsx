import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./slices/authSlice.jsx";
import courseSliceReducer from "./slices/courseSlice.jsx";
import razorpaySliceReducer from "./slices/razorpaySlice.jsx";
import lectureSliceReducer from './slices/LectureSlice.jsx'


const store = configureStore({
    reducer : {
        auth : authSliceReducer,
        course : courseSliceReducer,
        razorpay : razorpaySliceReducer,
        lecture : lectureSliceReducer
    },
    devTools : true
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;