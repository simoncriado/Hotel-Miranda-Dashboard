import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../fetchData";

export const getDataBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async () => {
    return await fetchData("Bookings");
  }
);

export const createNewBooking = createAsyncThunk(
  "bookings/CreateBooking",
  async (newBooking) => {
    return await newBooking;
  }
);
export const deleteBooking = createAsyncThunk(
  "bookings/DeleteBooking",
  async (bookingID) => {
    return await bookingID;
  }
);

const initialState = {
  bookingsList: [],
  status: "loading",
  singleBooking: null,
};

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getDataBookings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDataBookings.fulfilled, (state, action) => {
        state.status = "success";
        state.bookingsList = action.payload;
      })
      .addCase(getDataBookings.rejected, (state) => {
        state.status = "failed";
        console.error("Not possible to fetch the bookings");
      });

    builder.addCase(createNewBooking.fulfilled, (state, action) => {
      state.bookingsList = [...state.bookingsList, action.payload];
    });

    builder.addCase(deleteBooking.fulfilled, (state, action) => {
      state.bookingsList = state.bookingsList.filter(
        (booking) => booking.bookingID !== action.payload
      );
    });
  },
});

export default bookingsSlice.reducer;
