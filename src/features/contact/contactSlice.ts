import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchAPI from "../fetchAPI";
import type { ReviewInt } from "../../interfaces/ReviewInt";

// Defining types for the slice state
interface ReviewState {
  reviewsList: ReviewInt[] | [];
  status: string;
  update: boolean;
}

// Defining types for the slice actions
interface ActionInt {
  type: string;
  payload: any;
}

export const getDataReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async () => {
    return await fetchAPI("contact", "GET", null);
  }
);

// Defining the initial state using the types declared above
const initialState: ReviewState = {
  reviewsList: [],
  status: "loading",
  update: true,
};

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataReviews.pending, (state: ReviewState) => {
        state.status = "loading";
      })
      .addCase(
        getDataReviews.fulfilled,
        (state: ReviewState, action: ActionInt) => {
          state.status = "success";
          state.reviewsList = action.payload;
          state.update = false;
        }
      )
      .addCase(getDataReviews.rejected, (state: ReviewState) => {
        state.status = "failed";
        console.error("Not possible to fetch the reviews");
      });
  },
});

export default reviewsSlice.reducer;
