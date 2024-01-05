import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    allUsersCount : 0,
    subscribedCount : 0
}

export const getStatsData = createAsyncThunk();

const staticSlice = createSlice({
    name : "state",
    initialState,
    reducers: {},
    extraReducers: () => {}
})

export default staticSlice.reducer;