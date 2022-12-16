// React & Router
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Data
import BookingsList from "../../data/bookings";

// Component that displays the data for the selected room
const SingleBooking = () => {
  const params = useParams();
  const { bookingId } = params;
  const [filteredBooking, setFilteredBooking] = useState([]);

  useEffect(() => {
    const booking = BookingsList.filter(
      (booking) => booking.bookingID.toString() === bookingId
    );
    setFilteredBooking(booking);
  }, [bookingId]);

  if (filteredBooking[0]) {
    return (
      <div style={{ fontSize: 30 }}>
        This are the details for BOOKING{" "}
        <strong>{filteredBooking[0].bookingID}</strong>
      </div>
    );
  } else {
    return <div>Loading single booking</div>;
  }
};

export default SingleBooking;
