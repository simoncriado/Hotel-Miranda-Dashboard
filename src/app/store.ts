import { configureStore } from "@reduxjs/toolkit";
import sliceBookings from "../features/bookings/bookingsSlice";
import sliceRooms from "../features/rooms/roomsSlice";
// import sliceUsers from "../features/users/usersSlice";
// import sliceContact from "../features/contact/contactSlice";

// First thing is to create a Store with 2 reducers. Then I pass it to the top level component (index.js) so that all the other components in the app have access to the Store
export const store = configureStore({
  reducer: {
    bookingsReducer: sliceBookings,
    roomsReducer: sliceRooms,
    // usersReducer: sliceUsers,
    // contactReducer: sliceContact,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
