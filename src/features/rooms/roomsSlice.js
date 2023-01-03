import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../fetchData";

export const getDataRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  return await fetchData("Rooms");
});

export const createNewRoom = createAsyncThunk(
  "rooms/CreateRoom",
  async (newRoom) => {
    return await newRoom;
  }
);
export const deleteRoom = createAsyncThunk("rooms/DeleteRooms", async (id) => {
  return await id;
});

const initialState = {
  roomsList: [],
  status: "loading",
  singleRoom: null,
};

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getDataRooms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDataRooms.fulfilled, (state, action) => {
        state.status = "success";
        state.roomsList = action.payload;
      })
      .addCase(getDataRooms.rejected, (state) => {
        state.status = "failed";
        console.error("Not possible to fetch the rooms");
      });

    builder.addCase(createNewRoom.fulfilled, (state, action) => {
      state.roomsList = [...state.roomsList, action.payload];
    });

    builder.addCase(deleteRoom.fulfilled, (state, action) => {
      state.roomsList = state.roomsList.filter(
        (room) => room.id !== action.payload
      );
    });
  },
});

export default roomsSlice.reducer;
