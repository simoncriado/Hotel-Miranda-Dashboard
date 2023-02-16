import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchAPI from "../fetchAPI";
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
  update: boolean;
}

// Defining types for the slice actions
interface ActionInt {
  type: string;
  payload: any;
}

export const getDataRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  return await fetchAPI("rooms", "GET", null);
  // return await fakeDelay(fetchData("Rooms"));
});

export const getRoom = createAsyncThunk(
  "room/GetRoomDetails",
  async (id: number) => {
    return await fetchAPI(`rooms/${id}`, "GET", null);
  }
);

export const createNewRoom = createAsyncThunk(
  "rooms/CreateRoom",
  async (newRoom: RoomInt) => {
    return await fetchAPI(`rooms/newRoom`, "POST", newRoom);
  }
);

export const editRoom = createAsyncThunk(
  "rooms/EditRoom",
  async (currentRoom: any) => {
    return await fetchAPI(
      `rooms/editRoom/${currentRoom.roomID}`,
      "PUT",
      currentRoom
    );
  }
);

export const deleteRoom = createAsyncThunk(
  "rooms/DeleteRooms",
  async (id: number) => {
    return await fetchAPI(`rooms/${id}`, "DELETE", null);
  }
);

const initialState: RoomState = {
  roomsList: [],
  status: "loading",
  singleRoom: null,
  singleRoomStatus: "loading",
  update: true,
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
          state.update = false;
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
        state.singleRoom = action.payload;
      })
      .addCase(getRoom.rejected, (state: RoomState) => {
        state.singleRoomStatus = "failed";
        console.error("Not possible to fetch the room");
      });

    builder.addCase(
      createNewRoom.fulfilled,
      (state: RoomState, action: ActionInt) => {
        // state.roomsList = [...state.roomsList, action.payload.newroom];
        state.roomsList = [];
        state.update = true;
      }
    );

    builder.addCase(
      deleteRoom.fulfilled,
      (state: RoomState, action: ActionInt) => {
        state.roomsList = state.roomsList.filter(
          (room: any) => room.roomID !== action.payload.oldroom.roomID
        );
        state.update = true;
      }
    );

    builder.addCase(
      editRoom.fulfilled,
      (state: RoomState, action: ActionInt) => {
        state.roomsList = state.roomsList.map((room: any) => {
          return room.roomID === action.payload.newroom.roomID
            ? action.payload.newRoom
            : room;
        });

        state.singleRoom = null;
        state.update = true;
      }
    );
  },
});

export default roomsSlice.reducer;
