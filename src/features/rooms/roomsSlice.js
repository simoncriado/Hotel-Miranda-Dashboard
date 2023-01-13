import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../fetchData";

// function fakeDelay(data, time = 1000) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(data);
//     }, time);
//   });
// }

export const getDataRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  return await fetchData("Rooms");
  // return await fakeDelay(fetchData("Rooms"));
});

export const getRoom = createAsyncThunk("room/GetRoomDetails", async (id) => {
  return await id;
});

export const createNewRoom = createAsyncThunk(
  "rooms/CreateRoom",
  async (newRoom) => {
    return await newRoom;
  }
);

export const editRoom = createAsyncThunk("rooms/EditRoom", async (id) => {
  return await id;
});

export const deleteRoom = createAsyncThunk("rooms/DeleteRooms", async (id) => {
  return await id;
});

const initialState = {
  roomsList: [],
  status: "loading",
  singleRoom: null,
  singleRoomStatus: "loading",
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

    builder
      .addCase(getRoom.pending, (state) => {
        state.singleRoom = null;
        state.singleRoomStatus = "loading";
      })
      .addCase(getRoom.fulfilled, (state, action) => {
        state.singleRoomStatus = "success";
        state.singleRoom = state.roomsList.find(
          (room) => room.id === action.payload
        );
      })
      .addCase(getRoom.rejected, (state) => {
        state.singleRoomStatus = "failed";
        console.error("Not possible to fetch the room");
      });

    builder.addCase(createNewRoom.fulfilled, (state, action) => {
      state.roomsList = [...state.roomsList, action.payload];
    });

    builder.addCase(deleteRoom.fulfilled, (state, action) => {
      state.roomsList = state.roomsList.filter(
        (room) => room.id !== action.payload
      );
    });

    builder.addCase(editRoom.fulfilled, (state, action) => {
      state.roomsList = state.roomsList.map((room) => {
        return room.id === action.payload.id ? action.payload : room;
      });
      // CAUTION!! Is this even allowed? When finishing editing I remove the singleRoom data because otherwise when I try to edit the same room, the singleRoom data is still available
      // and it gets used to render the edit form
      state.singleRoom = null;
    });
  },
});

export default roomsSlice.reducer;
