// React
import React from "react";
import { useState } from "react";

// Local data
import BookingsList from "../../data/bookings";

// Styles
import { Table, HeaderTitle } from "../../components/styled/Tables";
import { Container } from "../../components/styled/Containers";

// Components
import { BookingRow } from "../../components/bookings/BookingRow";
import { Modal } from "../../components/styled/Modal";

// Component that creates a table and add a row for each item in the data base
const Bookings = () => {
  const [bookings, setBookings] = useState(BookingsList);
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [request, setRequest] = useState("");

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = (name, request) => {
    setOpenModal(true);
    setName(name);
    setRequest(request);
  };

  return (
    <Container>
      {openModal ? (
        <Modal name={name} request={request} closeModalHandler={closeModal} />
      ) : null}
      <Table>
        <thead>
          <tr>
            <HeaderTitle>Guest</HeaderTitle>
            <HeaderTitle>Order Date</HeaderTitle>
            <HeaderTitle>Check In</HeaderTitle>
            <HeaderTitle>Check Out</HeaderTitle>
            <HeaderTitle>Special Request</HeaderTitle>
            <HeaderTitle>Room type</HeaderTitle>
            <HeaderTitle>Status</HeaderTitle>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 &&
            bookings.map((booking, index) => (
              <BookingRow
                key={booking.id}
                index={index}
                booking={booking}
                number={booking.id}
                handleOpenModal={handleOpenModal}
              />
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Bookings;
