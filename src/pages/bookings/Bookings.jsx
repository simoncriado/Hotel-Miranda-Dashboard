// React & Router
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getDataBookings } from "../../features/bookings/bookingsSlice";

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
import { Loader } from "../../components/styled/Loader";
import { CreateButton } from "../../components/styled/Buttons";

// Components
import { BookingRow } from "../../components/bookings/BookingRow";
import { Modal } from "../../components/styled/Modal";
import { Pagination } from "../../components/pagination/Pagination";

// Component that creates a table and add a row for each item in the data base
const Bookings = () => {
  const dispatch = useDispatch();
  const { bookingsList, status } = useSelector(
    (state) => state.bookingsReducer
  );

  const [bookings, setBookings] = useState(bookingsList);
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [request, setRequest] = useState("");
  const [activeFilter, setActiveFilter] = useState("Order Date");
  const [currentBookings, setCurrentBookings] = useState([]);

  // Faking a delay on data fetch
  useEffect(() => {
    if (bookingsList.length === 0) {
      setTimeout(() => {
        dispatch(getDataBookings());
      }, 1000);
    }
    setBookings(bookingsList);
  }, [bookingsList, dispatch]);

  const getAllBookings = () => {
    setBookings(bookingsList);
  };

  const filterByType = (type) => {
    setBookings(bookingsList.filter((booking) => booking.status === type));
  };

  useEffect(() => {
    const orderedBookings = [...bookingsList];
    switch (activeFilter) {
      case "Order Date":
        orderedBookings.sort((a, b) => {
          let dateA = a.orderDate.slice(0, 10);
          let dateB = b.orderDate.slice(0, 10);
          if (
            dateB.split("/").reverse().join() <
            dateA.split("/").reverse().join()
          ) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case "Guest":
        orderedBookings.sort((a, b) => {
          const nameA = a.userName.toUpperCase().replace(/\s/g, "");
          const nameB = b.userName.toUpperCase().replace(/\s/g, "");
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
  }, [activeFilter, bookingsList]);

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
          <CreateButton>
            <NavLink to="/newBooking">+ New Booking</NavLink>
          </CreateButton>
          <DropdownMenu
            setActiveFilter={setActiveFilter}
            type="white"
            // options={["Order Date", "Guest", "Check In", "Check Out"]}
            options={["Order Date", "Guest"]}
          ></DropdownMenu>
        </TableButtons>
      </TableActions>

      {status === "loading" ? (
        <Loader />
      ) : (
        <>
          <Container>
            {openModal ? (
              <Modal
                name={name}
                request={request}
                closeModalHandler={closeModal}
              />
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
      )}
    </>
  );
};

export default Bookings;
