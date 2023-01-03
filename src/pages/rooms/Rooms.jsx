// React
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// DnD
import { DragDropContext, Droppable } from "react-beautiful-dnd";

// Local data
// import RoomsList from "../../data/rooms";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getDataRooms } from "../../features/rooms/roomsSlice";

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
import { CreateButton } from "../../components/styled/Buttons";
import { DropdownMenu } from "../../components/styled/DropdownMenu";
import { Loader } from "../../components/styled/Loader";

// Components
import { RoomRow } from "../../components/rooms/RoomRow";
import { Pagination } from "../../components/pagination/Pagination";

// Component that creates a table and add a row for each item in the data base
const Rooms = () => {
  const dispatch = useDispatch();
  const { roomsList, status } = useSelector((state) => state.roomsReducer);

  const [rooms, setRooms] = useState(roomsList);
  const [activeFilter, setActiveFilter] = useState("Room Nr.");
  const [currentRooms, setCurrentRooms] = useState([]);

  // Faking a delay on data fetch
  useEffect(() => {
    if (roomsList.length === 0) {
      setTimeout(() => {
        dispatch(getDataRooms());
      }, 2000);
    }
    setRooms(roomsList);
  }, [roomsList, dispatch]);

  const getAllRooms = () => {
    setRooms(roomsList);
  };

  const filterByType = (type) => {
    setRooms(roomsList.filter((room) => room.room_status === type));
  };

  useEffect(() => {
    // Filtering by dropdown selection based on the filtered by search input array (in case the user used the search bar)
    const orderedRooms = [...roomsList];
    switch (activeFilter) {
      case "Room Nr.":
        orderedRooms.sort((a, b) => a.room_number - b.room_number);
        break;
      case "Highest rate first":
        orderedRooms.sort((a, b) => b.room_rate - a.room_rate);
        break;
      case "Lowest rate first":
        orderedRooms.sort((a, b) => a.room_rate - b.room_rate);
        break;
      default:
        break;
    }
    setRooms(orderedRooms);
  }, [activeFilter, roomsList]);

  // Variables for the pagination component
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(10);
  const indexOfLastImage = currentPage * roomsPerPage; // For example: let´s say we have 17 pages. indexOfLastImage = 17 * roomsPerPage
  const indexOfFirstImage = indexOfLastImage - roomsPerPage; // Following same example: indexOfFirstImage = indexOfLastPage – roomsPerPage
  // Setting the current displayed images
  useEffect(() => {
    setCurrentRooms(rooms.slice(indexOfFirstImage, indexOfLastImage));
  }, [rooms, indexOfFirstImage, indexOfLastImage]);

  // Images to be displayed on the current page. slice(96, 102) will return images from index 96 to 101
  const nPages = Math.ceil(rooms.length / roomsPerPage);

  // Function to help with reordering the result after dragging
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  // Function to manage the drag event
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }

    setRooms((prevRooms) =>
      reorder(prevRooms, source.index, destination.index)
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <TableActions>
        <TableFilters>
          <FilterButton onClick={getAllRooms}>All Rooms</FilterButton>
          <FilterButton onClick={() => filterByType("Available")}>
            Available Rooms
          </FilterButton>
          <FilterButton onClick={() => filterByType("Booked")}>
            Booked Rooms
          </FilterButton>
        </TableFilters>
        <TableButtons>
          <CreateButton>
            <NavLink to="/newRoom">+ New Room</NavLink>
          </CreateButton>
          <DropdownMenu
            setActiveFilter={setActiveFilter}
            type="white"
            options={["Room Nr.", "Highest rate first", "Lowest rate first"]}
          ></DropdownMenu>
        </TableButtons>
      </TableActions>

      {status === "loading" ? (
        <Loader />
      ) : (
        <>
          <Container>
            <Table>
              <thead>
                <tr>
                  <HeaderTitle>Room Name</HeaderTitle>
                  <HeaderTitle>Bed Type</HeaderTitle>
                  <HeaderTitle>Facilities</HeaderTitle>
                  <HeaderTitle>Rate</HeaderTitle>
                  <HeaderTitle>Offer Price</HeaderTitle>
                  <HeaderTitle>Status</HeaderTitle>
                </tr>
              </thead>
              <Droppable droppableId="rooms">
                {(droppableProvided) => (
                  <tbody
                    {...droppableProvided.droppableProps}
                    ref={droppableProvided.innerRef}
                    className="task-container"
                  >
                    {currentRooms.length > 0 &&
                      currentRooms.map((room, index) => (
                        <RoomRow
                          key={room.id}
                          index={index}
                          room={room}
                          number={room.id}
                        />
                      ))}
                    {droppableProvided.placeholder}
                  </tbody>
                )}
              </Droppable>
            </Table>
          </Container>
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            dataDisplayed={"rooms"}
            totalRooms={rooms.length}
            indexOfFirstImage={indexOfFirstImage}
            indexOfLastImage={indexOfLastImage}
          />
        </>
      )}
    </DragDropContext>
  );
};

export default Rooms;
