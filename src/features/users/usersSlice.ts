import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchAPI from "../fetchAPI";
import type { UserInt } from "../../interfaces/UserInt";

// Defining types for the slice state
interface UserState {
  usersList: UserInt[] | [];
  singleUser: UserInt | null | undefined;
  status: string;
  singleUserStatus: string;
  update: boolean;
}

// Defining types for the slice actions
interface ActionInt {
  type: string;
  payload: any;
}

export const getDataUsers = createAsyncThunk("users/fetchUsers", async () => {
  return await fetchAPI("users", "GET", null);
});
export const getUser = createAsyncThunk(
  "user/GetUserDetails",
  async (id: number) => {
    return await fetchAPI(`users/${id}`, "GET", null);
  }
);
export const createNewUser = createAsyncThunk(
  "users/CreateUser",
  async (newUser: UserInt) => {
    return await fetchAPI(`users/newUser`, "POST", newUser);
  }
);
export const editUser = createAsyncThunk(
  "users/EditUser",
  async (currentUser: any) => {
    return await fetchAPI(
      `users/editUser/${currentUser.userID}`,
      "PUT",
      currentUser
    );
  }
);
export const deleteUser = createAsyncThunk(
  "users/DeleteUser",
  async (id: number) => {
    return await fetchAPI(`users/${id}`, "DELETE", null);
  }
);

// Defining the initial state using the types declared above
const initialState: UserState = {
  usersList: [],
  status: "loading",
  singleUser: null,
  singleUserStatus: "loading",
  update: true,
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
          state.update = false;
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
        state.singleUser = action.payload;
      })
      .addCase(getUser.rejected, (state: UserState) => {
        state.singleUserStatus = "failed";
        console.error("Not possible to fetch the user");
      });

    builder.addCase(
      createNewUser.fulfilled,
      (state: UserState, action: ActionInt) => {
        // state.usersList = [...state.usersList, action.payload.newuser];
        state.usersList = [];
        state.update = true;
      }
    );

    builder.addCase(
      deleteUser.fulfilled,
      (state: UserState, action: ActionInt) => {
        state.usersList = state.usersList.filter(
          (user: any) => user.userID !== action.payload.olduser.userID
        );
      }
    );

    builder.addCase(
      editUser.fulfilled,
      (state: UserState, action: ActionInt) => {
        state.usersList = state.usersList.map((user: any) => {
          return user.userID === action.payload.newuser.userID
            ? action.payload.newuser
            : user;
        });
        state.singleUser = null;
        state.update = true;
      }
    );
  },
});

export default usersSlice.reducer;
