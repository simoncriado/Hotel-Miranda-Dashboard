import React from "react";

import { Card, CardData } from "./SingleBookingCardStyled";

// Local data
import BookingssList from "../../data/bookings";
import RoomssList from "../../data/rooms";

export const SingleBookingCard = (checkIn) => {
  return (
    <Card>
      <img src={RoomssList[0].photo} alt="Room img" />
      <CardData>
        <h2>{BookingssList[0].roomType}</h2>
        <p>{BookingssList[0].userName}</p>
      </CardData>
      <CardData style={{ marginLeft: "auto" }}>
        <p>Check In: {checkIn.checkIn}</p>
        <p>Check Out: {checkIn.checkOut}</p>
      </CardData>
    </Card>
  );
};
