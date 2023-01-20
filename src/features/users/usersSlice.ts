import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../fetchData";
import type { UserInt } from "../../interfaces/UserInt";

// Defining types for the slice state
interface UserState {
  usersList: UserInt[] | [];
  singleUser: UserInt | null | undefined;
  status: string;
  singleUserStatus: string;
}

// Defining types for the slice actions
interface ActionInt {
  type: string;
  payload: any;
}

export const getDataUsers = createAsyncThunk("users/fetchUsers", async () => {
  return await fetchData("Users");
});
export const getUser = createAsyncThunk(
  "user/GetUserDetails",
  async (id: number) => {
    return await id;
  }
);
export const createNewUser = createAsyncThunk(
  "users/CreateUser",
  async (newUser: UserInt) => {
    return await newUser;
  }
);
export const editUser = createAsyncThunk(
  "users/EditUser",
  async (id: number) => {
    return await id;
  }
);
export const deleteUser = createAsyncThunk(
  "users/DeleteUser",
  async (id: number) => {
    return await id;
  }
);

// Defining the initial state using the types declared above
const initialState: UserState = {
  usersList: [],
  status: "loading",
  singleUser: null,
  singleUserStatus: "loading",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataUsers.pending, (state: UserState) => {
        state.status = "loading";
      })
      .addCase(
        getDataUsers.fulfilled,
        (state: UserState, action: ActionInt) => {
          state.status = "success";
          state.usersList = action.payload;
        }
      )
      .addCase(getDataUsers.rejected, (state: UserState) => {
        state.status = "failed";
        console.error("Not possible to fetch the users");
      });

    builder
      .addCase(getUser.pending, (state: UserState) => {
        state.singleUser = null;
        state.singleUserStatus = "loading";
      })
      .addCase(getUser.fulfilled, (state: UserState, action: ActionInt) => {
        state.singleUserStatus = "success";
        state.singleUser = state.usersList.find(
          (user) => user.id === action.payload
        );
      })
      .addCase(getUser.rejected, (state: UserState) => {
        state.singleUserStatus = "failed";
        console.error("Not possible to fetch the user");
      });

    builder.addCase(
      createNewUser.fulfilled,
      (state: UserState, action: ActionInt) => {
        state.usersList = [...state.usersList, action.payload];
      }
    );

    builder.addCase(
      deleteUser.fulfilled,
      (state: UserState, action: ActionInt) => {
        state.usersList = state.usersList.filter(
          (user) => user.id !== action.payload
        );
      }
    );

    builder.addCase(
      editUser.fulfilled,
      (state: UserState, action: ActionInt) => {
        state.usersList = state.usersList.map((user) => {
          return user.id === action.payload.id ? action.payload : user;
        });
        state.singleUser = null;
      }
    );
  },
});

export default usersSlice.reducer;
