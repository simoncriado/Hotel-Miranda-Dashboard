// React
import React, { useState, useEffect } from "react";

// Local data
import BookingsList from "../../data/bookings";

// Styled Components
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
import { Pagination } from "../../components/pagination/Pagination";

// Component that creates a table and add a row for each item in the data base
const Bookings = () => {
  const [bookings, setBookings] = useState(BookingsList);
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [request, setRequest] = useState("");
  const [activeFilter, setActiveFilter] = useState("Guest");
  const [currentBookings, setCurrentBookings] = useState([]);

  const getAllBookings = () => {
    setBookings(BookingsList);
  };

  const filterByType = (type) => {
    setBookings(BookingsList.filter((booking) => booking.status === type));
  };

  useEffect(() => {
    // STILL WORKING ON THE FILTERS BY DATE! ONLY THE ONE BY GUESTNAME WORDS ATM!
    const orderedBookings = [...BookingsList];
    switch (activeFilter) {
      case "Order Date":
        orderedBookings.sort((a, b) => {
          const date1 = new Date("Oct 30th 2022");
          const date2 = new Date(b.orderDate);

          return date1 - date2;
        });
        break;
      case "Guest":
        orderedBookings.sort((a, b) => {
          const nameA = a.user.name.toUpperCase().replace(/\s/g, "");
          const nameB = b.user.name.toUpperCase().replace(/\s/g, "");
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
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
    setBookings(orderedBookings);
  }, [activeFilter]);

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = (name, request, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setOpenModal(true);
    setName(name);
    setRequest(request);
  };

  // Variables for the pagination component
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(10);
  const indexOfLastImage = currentPage * bookingsPerPage; // For example: let´s say we have 17 pages. indexOfLastImage = 17 * roomsPerPage
  const indexOfFirstImage = indexOfLastImage - bookingsPerPage; // Following same example: indexOfFirstImage = indexOfLastPage – roomsPerPage
  // Setting the current displayed images
  useEffect(() => {
    setCurrentBookings(bookings.slice(indexOfFirstImage, indexOfLastImage));
  }, [bookings, indexOfFirstImage, indexOfLastImage]);

  // Images to be displayed on the current page. slice(96, 102) will return images from index 96 to 101
  const nPages = Math.ceil(bookings.length / bookingsPerPage);

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
            // options={["Order Date", "Guest", "Check In", "Check Out"]}
            options={["Guest"]}
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
            {currentBookings.length > 0 &&
              currentBookings.map((booking, index) => (
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
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        dataDisplayed={"bookings"}
        totalRooms={bookings.length}
        indexOfFirstImage={indexOfFirstImage}
        indexOfLastImage={indexOfLastImage}
      />
    </>
  );
};

export default Bookings;
