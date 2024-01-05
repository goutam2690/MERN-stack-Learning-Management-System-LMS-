import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance.jsx"

const initialState = {
    key: "",
    subscription_id : "",
    isPaymentVerified: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: []
}

export const getRazorpayId = createAsyncThunk('/razorpay/getId', async () => {
    try {
        const res = await axiosInstance.get("/payments/razorpay-key");
        return res.data;
    } catch (error) {
        toast.error("Failed to load data");
    }
})


export const purchaseCourse = createAsyncThunk('/course/purchase', async () => {
    try {
        const res = await axiosInstance.post("/payments/subscribe", {
            total_count: 1,
        });
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        toast.error("failed to load data")
        throw error; // Rethrow the error to ensure the rejection of the promise
    }
});

export const verifyUserPayment = createAsyncThunk('/payment/verify', async (data) => {
    try {
        const res = await axiosInstance.post("/payments/verify", {
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature: data.razorpay_signature
        });
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        // console.log(error?.response?.data?.message)
    }
})

export const getPaymentRecord = createAsyncThunk('/payments/record', async () => {
    try {
        const res = await axiosInstance.post("/payments?count=100");
        toast.promise(res, {
            loading: "Getting Payment Records...",
            success: (data) => {
                return data?.data?.message
            },
            error: "failed to get payment records"
        })
        return res.data;
    } catch (error) {
        toast.error("failed to load payment records");
    }
})

export const cancelPurchase = createAsyncThunk('/payments/cancel', async () => {
    try {
        const res = await axiosInstance.post("/payments/unsubscribe");
        toast.promise(res, {
            loading: "Unsubscribing course...",
            success: (data) => {
                return data?.data?.message
            },
            error: "failed to Unsubscribing course"
        })
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);

    }
})

const razorpaySlice = createSlice({
    name: "razorpay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRazorpayId.fulfilled, (state, action) => {
                state.key = action?.payload?.key
            })
            .addCase(purchaseCourse.fulfilled, (state, action)=>{
                state.subscription_id = action?.payload?.subscription_id
            })
            .addCase(verifyUserPayment.fulfilled, (state, action)=>{
                toast.success(action?.payload?.message)
                state.isPaymentVerified = action?.payload?.success              
            })
            .addCase(verifyUserPayment.rejected, (state, action)=>{
                toast.success(action?.payload?.message);
                state.isPaymentVerified = action?.payload?.success;
            })
            .addCase(getPaymentRecord.fulfilled, (state, action)=>{
                state.allPayments = action?.payload?.allPayments;
                state.finalMonths = action?.payload?.finalMonths;
                state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
            })
    }
})


export default razorpaySlice.reducer;