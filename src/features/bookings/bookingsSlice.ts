import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchAPI from "../fetchAPI";
import { fetchData } from "../fetchData";
import type { BookingInt } from "../../interfaces/BookingInt";

// Defining types for the slice state
interface BookingState {
  bookingsList: BookingInt[] | [];
  singleBooking: BookingInt | null | undefined;
  status: string;
  singleBookingStatus: string;
}

// Defining types for the slice actions
interface ActionInt {
  type: string;
  payload: any;
}

export const getDataBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async () => {
    return await fetchAPI("bookings", "GET", null);
  }
);
export const getBooking = createAsyncThunk(
  "booking/GetBookingDetails",
  async (idBooking: number) => {
    return await fetchAPI(`bookings/${idBooking}`, "GET", null);
  }
);
export const createNewBooking = createAsyncThunk(
  "bookings/CreateBooking",
  async (newBooking: BookingInt) => {
    return await fetchAPI(`bookings/newBooking`, "POST", newBooking);
  }
);
export const editBooking = createAsyncThunk(
  "bookings/EditBooking",
  async (idBooking: number) => {
    return await idBooking;
  }
);
export const deleteBooking = createAsyncThunk(
  "bookings/DeleteBooking",
  async (bookingID: number) => {
    return await bookingID;
  }
);

// Defining the initial state using the types declared above
const initialState: BookingState = {
  bookingsList: [],
  status: "loading",
  singleBooking: null,
  singleBookingStatus: "loading",
};

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataBookings.pending, (state: BookingState) => {
        state.status = "loading";
      })
      .addCase(
        getDataBookings.fulfilled,
        (state: BookingState, action: ActionInt) => {
          state.status = "success";
          state.bookingsList = action.payload;
        }
      )
      .addCase(getDataBookings.rejected, (state: BookingState) => {
        state.status = "failed";
        console.error("Not possible to fetch the bookings");
      });

    builder
      .addCase(getBooking.pending, (state: BookingState) => {
        state.singleBooking = null;
        state.singleBookingStatus = "loading";
      })
      .addCase(
        getBooking.fulfilled,
        (state: BookingState, action: ActionInt) => {
          state.singleBookingStatus = "success";
          state.singleBooking = action.payload;
        }
      )
      .addCase(getBooking.rejected, (state: BookingState) => {
        state.singleBookingStatus = "failed";
        console.error("Not possible to fetch the booking");
      });

    builder.addCase(
      createNewBooking.fulfilled,
      (state: BookingState, action: ActionInt) => {
        state.bookingsList = [...state.bookingsList, action.payload];
      }
    );

    builder.addCase(
      deleteBooking.fulfilled,
      (state: BookingState, action: ActionInt) => {
        state.bookingsList = state.bookingsList.filter(
          (booking) => booking.bookingID !== action.payload
        );
      }
    );

    builder.addCase(
      editBooking.fulfilled,
      (state: BookingState, action: ActionInt) => {
        state.bookingsList = state.bookingsList.map((booking) => {
          return booking.bookingID === action.payload.bookingID
            ? action.payload
            : booking;
        });
        state.singleBooking = null;
      }
    );
  },
});

export default bookingsSlice.reducer;
