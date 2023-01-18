// React & Router
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// Redux
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

// TypeScript
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { BookingInt } from "../../interfaces/BookingInt";

type BookingsType = {
  bookingsList: BookingInt[];
};
type StatusType = {
  status: string;
};

// Component that creates a table and add a row for each item in the data base
const Bookings = () => {
  const dispatch = useAppDispatch();
  const { bookingsList } = useAppSelector<BookingsType>(
    (state) => state.bookingsReducer
  );
  const { status } = useAppSelector<StatusType>(
    (state) => state.bookingsReducer
  );

  const [bookings, setBookings] = useState<BookingInt[]>(bookingsList);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [request, setRequest] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("Order Date");
  const [currentBookings, setCurrentBookings] = useState<BookingInt[]>([]);

  // Faking a delay on data fetch
  useEffect(() => {
    if (bookingsList.length === 0) {
      setTimeout(() => {
        dispatch(getDataBookings());
      }, 1000);
    }
    setBookings(bookingsList);
  }, [bookingsList, dispatch]);

  const getAllBookings = (): void => {
    setBookings(bookingsList);
  };

  const filterByType = (type: string): void => {
    setBookings(bookingsList.filter((booking) => booking.status === type));
  };

  useEffect(() => {
    // STILL WORKING ON THE FILTERS BY DATE! ONLY THE ONE BY GUESTNAME WORDS ATM!
    const orderedBookings: BookingInt[] = [...bookingsList];
    switch (activeFilter) {
      case "Order Date":
        orderedBookings.sort((a: BookingInt, b: BookingInt) => {
          let dateA: string = a.orderDate.slice(0, 10);
          let dateB: string = b.orderDate.slice(0, 10);
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
        orderedBookings.sort((a: BookingInt, b: BookingInt) => {
          const nameA: string = a.userName.toUpperCase().replace(/\s/g, "");
          const nameB: string = b.userName.toUpperCase().replace(/\s/g, "");
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
        orderedBookings.sort((a: BookingInt, b: BookingInt) => {
          let dateA: string = a.checkIn;
          let dateB: string = b.checkIn;
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
      case "Check Out":
        orderedBookings.sort((a: BookingInt, b: BookingInt) => {
          let dateA: string = a.checkOut;
          let dateB: string = b.checkOut;
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
      default:
        break;
    }
    setBookings(orderedBookings);
  }, [activeFilter, bookingsList]);

  const closeModal = (): void => {
    setOpenModal(false);
  };

  const handleOpenModal = (name: string, request: string, e: any): void => {
    if (e && e.stopPropagation) e.stopPropagation();
    setOpenModal(true);
    setName(name);
    setRequest(request);
  };

  // Variables for the pagination component
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [bookingsPerPage] = useState<number>(10);
  const indexOfLastImage: number = currentPage * bookingsPerPage; // For example: let´s say we have 17 pages. indexOfLastImage = 17 * roomsPerPage
  const indexOfFirstImage: number = indexOfLastImage - bookingsPerPage; // Following same example: indexOfFirstImage = indexOfLastPage – roomsPerPage
  // Setting the current displayed images
  useEffect(() => {
    setCurrentBookings(bookings.slice(indexOfFirstImage, indexOfLastImage));
  }, [bookings, indexOfFirstImage, indexOfLastImage]);

  // Images to be displayed on the current page. slice(96, 102) will return images from index 96 to 101
  const nPages: number = Math.ceil(bookings.length / bookingsPerPage);

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
            options={["Order Date", "Guest", "Check In", "Check Out"]}
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
                  currentBookings.map((booking: BookingInt) => (
                    <BookingRow
                      key={booking.id}
                      booking={booking}
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
