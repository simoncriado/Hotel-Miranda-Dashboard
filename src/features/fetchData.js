import bookings from "../data/bookings.json";
import rooms from "../data/rooms.json";
import users from "../data/users.json";
import reviews from "../data/reviews.json";

// const artificialDelay = (data) => {
//   setTimeout(() => {
//     return data;
//   }, 1000);
// };

export const fetchData = (query) => {
  switch (query) {
    case "Bookings":
      return bookings;
    case "Rooms":
      return rooms;
    case "Users":
      return users;
    case "Reviews":
      return reviews;
    default:
      return "";
  }
};
