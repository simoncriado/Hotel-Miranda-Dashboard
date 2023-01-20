import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../fetchData";

export const getDataReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async () => {
    return await fetchData("Reviews");
  }
);

// Defining the initial state using the types declared above
const initialState = {
  reviewsList: [],
  status: "loading",
};

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getDataReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDataReviews.fulfilled, (state, action) => {
        state.status = "success";
        state.reviewsList = action.payload;
      })
      .addCase(getDataReviews.rejected, (state) => {
        state.status = "failed";
        console.error("Not possible to fetch the reviews");
      });
  },
});

export default reviewsSlice.reducer;
