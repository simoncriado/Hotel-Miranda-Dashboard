import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchLogin from "./fetchLogin";

export const getLogin = createAsyncThunk(
  "login/getLogin",
  async (email, pass) => {
    return await fetchLogin(email, pass);
  }
);

const initialState = {
  _id: null,
  email: null,
  token: null,
  userdata: null,
};

export const sliceLogin = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLogin.fulfilled, (state, action) => {
      const user = action.payload.user;
      const token = action.payload.token;

      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: user,
          token: token,
        })
      );

      state._id = user._id;
      state.email = user.email;

      state.token = token;
    });
  },
});

export default sliceLogin.reducer;
