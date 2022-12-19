// React & Router
import React from "react";
import { useNavigate } from "react-router";

// Styles
import {
  Row,
  DataContainer,
  DataContainerButton,
  GuestContainer,
  GuestName,
  BookingID,
  Status,
  NotesButton,
} from "./BookingRowStyled";

// Component that creates a table row for the bookings table
export const BookingRow = ({ booking, handleOpenModal }) => {
  const navigate = useNavigate();

  const goToSingleBooking = (id) => {
    navigate("/bookings/" + id);
  };

  return (
    <Row
      onClick={() => {
        goToSingleBooking(booking.bookingID);
      }}
    >
      <td>
        <GuestContainer>
          <img src={booking.user.picture} alt="User portrait" />
          <div>
            <GuestName>{booking.user.name}</GuestName>
            <BookingID>#{booking.bookingID}</BookingID>
          </div>
        </GuestContainer>
      </td>
      <DataContainer className="data-container__text">
        <p>{booking.orderDate}</p>
      </DataContainer>
      <DataContainer className="data-container__text">
        <p>
          {booking.checkIn.date} at {booking.checkIn.hour}
        </p>
      </DataContainer>
      <DataContainer className="data-container__text">
        <p>
          {booking.checkOut.date} at {booking.checkOut.hour}
        </p>
      </DataContainer>
      <td>
        <NotesButton
          type={booking.specialRequest}
          text="View Notes"
          enabled={booking.description}
          onClick={() => {
            handleOpenModal(booking.user.name, booking.specialRequest);
          }}
        >
          {booking.specialRequest == null ? "No Notes" : "View Notes"}
        </NotesButton>
      </td>

      <DataContainer className="data-container__text">
        <p>{booking.roomType}</p>
      </DataContainer>
      <td>
        <Status $type={booking.status}>{booking.status}</Status>
      </td>
      <DataContainerButton>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            width="30"
            viewBox="0 0 48 48"
          >
            <path d="M24.05 41.7q-1.25 0-2.125-.875t-.875-2.075q0-1.2.875-2.1.875-.9 2.075-.9 1.25 0 2.1.9.85.9.85 2.1 0 1.2-.85 2.075-.85.875-2.05.875Zm0-14.75q-1.25 0-2.125-.875T21.05 24q0-1.25.875-2.1.875-.85 2.075-.85 1.25 0 2.1.85.85.85.85 2.05 0 1.25-.85 2.125t-2.05.875Zm0-14.7q-1.25 0-2.125-.875T21.05 9.25q0-1.25.875-2.125T24 6.25q1.25 0 2.1.875.85.875.85 2.125t-.85 2.125q-.85.875-2.05.875Z" />
          </svg>
        </button>
      </DataContainerButton>
    </Row>
  );
};
