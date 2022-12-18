// React
import React, { useState, useEffect } from "react";

// Local data
import BookingsList from "../../data/bookings";

// Styles
import {
  Table,
  HeaderTitle,
  TableActions,
  TableFilters,
  FilterButton,
  TableButtons,
} from "../../components/styled/Tables";
import { Container } from "../../components/styled/Containers";
import { DropdownMenu } from "../../components/styled/DropdownMenu";

// Components
import { BookingRow } from "../../components/bookings/BookingRow";
import { Modal } from "../../components/styled/Modal";

// Component that creates a table and add a row for each item in the data base
const Bookings = () => {
  const [bookings, setBookings] = useState(BookingsList);
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [request, setRequest] = useState("");
  const [activeFilter, setActiveFilter] = useState("Order Date");
  const [currentRooms, setCurrentRooms] = useState([]);

  const getAllBookings = () => {
    setBookings(BookingsList);
  };

  const filterByType = (type) => {
    setBookings(BookingsList.filter((booking) => booking.status === type));
  };

  useEffect(() => {
    // Filtering by dropdown selection based on the filtered by search input array (in case the user used the search bar)
    const orderedBookings = [...BookingsList];
    switch (activeFilter) {
      case "Order Date":
        orderedBookings.sort((a, b) => {
          // Convert string dates into `Date` objects
          const date1 = new Date("Oct 30th 2022");
          const date2 = new Date(b.orderDate);

          return date1 - date2;
        });
        break;
      case "Guest":
        orderedBookings.sort((a, b) => b.room_rate - a.room_rate);
        break;
      case "Check In":
        orderedBookings.sort((a, b) => a.room_rate - b.room_rate);
        break;
      case "Check Out":
        orderedBookings.sort((a, b) => a.room_rate - b.room_rate);
        break;
      default:
        break;
    }
    // setBookings(orderedBookings);
  }, [activeFilter]);

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = (name, request) => {
    setOpenModal(true);
    setName(name);
    setRequest(request);
  };

  return (
    <>
      <TableActions>
        <TableFilters>
          <FilterButton onClick={getAllBookings}>All Bookings</FilterButton>
          <FilterButton onClick={() => filterByType("Check In")}>
            Check In
          </FilterButton>
          <FilterButton onClick={() => filterByType("Check Out")}>
            Check Out
          </FilterButton>
          <FilterButton onClick={() => filterByType("In Progress")}>
            In Progress
          </FilterButton>
        </TableFilters>
        <TableButtons>
          <DropdownMenu
            setActiveFilter={setActiveFilter}
            type="white"
            options={["Order Date", "Guest", "Check In", "Check Out"]}
          ></DropdownMenu>
        </TableButtons>
      </TableActions>
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
    </>
  );
};

export default Bookings;
