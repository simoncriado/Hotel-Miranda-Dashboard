import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../fetchData";
import type { RoomInt } from "../../interfaces/RoomInt";

// This could be an alternative to have the fake delay in the rooms page
// function fakeDelay(data, time = 1000) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(data);
//     }, time);
//   });
// }

// Defining types for the slice state
interface RoomState {
  roomsList: RoomInt[] | [];
  singleRoom: RoomInt | null | undefined;
  status: string;
  singleRoomStatus: string;
}

// Defining types for the slice actions
interface ActionInt {
  type: string;
  payload: any;
}

export const getDataRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  return await fetchData("Rooms");
  // return await fakeDelay(fetchData("Rooms"));
});

export const getRoom = createAsyncThunk(
  "room/GetRoomDetails",
  async (id: string) => {
    return await id;
  }
);

export const createNewRoom = createAsyncThunk(
  "rooms/CreateRoom",
  async (newRoom: RoomInt) => {
    return await newRoom;
  }
);

export const editRoom = createAsyncThunk(
  "rooms/EditRoom",
  async (id: string) => {
    return await id;
  }
);

export const deleteRoom = createAsyncThunk(
  "rooms/DeleteRooms",
  async (id: string) => {
    return await id;
  }
);

const initialState: RoomState = {
  roomsList: [],
  status: "loading",
  singleRoom: null,
  singleRoomStatus: "loading",
};

export const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataRooms.pending, (state: RoomState) => {
        state.status = "loading";
      })
      .addCase(
        getDataRooms.fulfilled,
        (state: RoomState, action: ActionInt) => {
          state.status = "success";
          state.roomsList = action.payload;
        }
      )
      .addCase(getDataRooms.rejected, (state: RoomState) => {
        state.status = "failed";
        console.error("Not possible to fetch the rooms");
      });

    builder
      .addCase(getRoom.pending, (state: RoomState) => {
        state.singleRoom = null;
        state.singleRoomStatus = "loading";
      })
      .addCase(getRoom.fulfilled, (state: RoomState, action: ActionInt) => {
        state.singleRoomStatus = "success";
        state.singleRoom = state.roomsList.find(
          (room) => room.id === action.payload
        );
      })
      .addCase(getRoom.rejected, (state: RoomState) => {
        state.singleRoomStatus = "failed";
        console.error("Not possible to fetch the room");
      });

    builder.addCase(
      createNewRoom.fulfilled,
      (state: RoomState, action: ActionInt) => {
        state.roomsList = [...state.roomsList, action.payload];
      }
    );

    builder.addCase(
      deleteRoom.fulfilled,
      (state: RoomState, action: ActionInt) => {
        state.roomsList = state.roomsList.filter(
          (room) => room.id !== action.payload
        );
      }
    );

    builder.addCase(
      editRoom.fulfilled,
      (state: RoomState, action: ActionInt) => {
        state.roomsList = state.roomsList.map((room) => {
          return room.id === action.payload.id ? action.payload : room;
        });
        // CAUTION!! Is this even allowed? When finishing editing I remove the singleRoom data because otherwise when I try to edit the same room, the singleRoom data is still available
        // and it gets used to render the edit form
        state.singleRoom = null;
      }
    );
  },
});

export default roomsSlice.reducer;
