import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../fetchData";

export const getDataBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async () => {
    // setTimeout(() => {
    //   return fetchData("Bookings");
    // }, 1000);
    return await fetchData("Bookings");
  }
);

const initialState = {
  bookingsList: [],
  status: "",
  singleBooking: null,
};

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getDataBookings.fulfilled, (state, action) => {
        state.status = "success";
        state.bookingsList = action.payload;
      })
      .addCase(getDataBookings.rejected, (state) => {
        state.status = "failed";
        console.error("Not possible to fetch the bookings");
      });
  },
});

export default bookingsSlice.reducer;
