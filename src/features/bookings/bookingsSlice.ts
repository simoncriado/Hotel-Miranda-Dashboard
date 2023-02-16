import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchAPI from "../fetchAPI";
import type { BookingInt } from "../../interfaces/BookingInt";

// Defining types for the slice state
interface BookingState {
  bookingsList: BookingInt[] | [];
  singleBooking: BookingInt | null | undefined;
  status: string;
  singleBookingStatus: string;
  update: boolean;
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
  async (currentBooking: any) => {
    return await fetchAPI(
      `bookings/editBooking/${currentBooking.bookingID}`,
      "PUT",
      currentBooking
    );
  }
);
export const deleteBooking = createAsyncThunk(
  "bookings/DeleteBooking",
  async (idBooking: number) => {
    return await fetchAPI(`bookings/${idBooking}`, "DELETE", null);
  }
);

// Defining the initial state using the types declared above
const initialState: BookingState = {
  bookingsList: [],
  status: "loading",
  singleBooking: null,
  singleBookingStatus: "loading",
  update: true,
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
          state.update = false;
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
        // state.bookingsList = [...state.bookingsList, action.payload.newbooking];
        state.bookingsList = [];
        state.update = true;
      }
    );

    builder.addCase(
      deleteBooking.fulfilled,
      (state: BookingState, action: ActionInt) => {
        state.bookingsList = state.bookingsList.filter(
          (booking: any) =>
            booking.bookingID !== action.payload.oldbooking.bookingID
        );
        state.update = true;
      }
    );

    builder.addCase(
      editBooking.fulfilled,
      (state: BookingState, action: ActionInt) => {
        state.bookingsList = state.bookingsList.map((booking: any) => {
          return booking.bookingID === action.payload.newbooking.bookingID
            ? action.payload.newbooking
            : booking;
        });
        state.singleBooking = null;
        state.update = true;
      }
    );
  },
});

export default bookingsSlice.reducer;
