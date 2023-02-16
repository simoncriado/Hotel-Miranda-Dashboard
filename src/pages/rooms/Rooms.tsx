// React
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// DnD
import { DragDropContext, Droppable } from "react-beautiful-dnd";

// Redux
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

// TypeScript
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RoomInt } from "../../interfaces/RoomInt";

type RoomsType = {
  roomsList: RoomInt[];
};
type StatusType = {
  status: string;
};

type UpdateType = {
  update: boolean;
};

// Component that creates a table and add a row for each item in the data base
const Rooms = () => {
  const dispatch = useAppDispatch();
  const { roomsList } = useAppSelector<RoomsType>(
    (state) => state.roomsReducer
  );
  const { status } = useAppSelector<StatusType>((state) => state.roomsReducer);

  const { update } = useAppSelector<UpdateType>((state) => state.roomsReducer);

  const [rooms, setRooms] = useState<RoomInt[]>(roomsList);
  const [activeFilter, setActiveFilter] = useState<string>("Room Nr.");
  const [currentRooms, setCurrentRooms] = useState<RoomInt[]>([]);

  // Faking a delay on data fetch
  useEffect(() => {
    if (update) {
      dispatch(getDataRooms());
    }

    setRooms(roomsList);
  }, [roomsList, dispatch, update]);

  const getAllRooms = (): void => {
    setRooms(roomsList);
  };

  const filterByType = (type: string): void => {
    setRooms(roomsList.filter((room) => room.room_status === type));
  };

  useEffect(() => {
    // Filtering by dropdown selection based on the filtered by search input array (in case the user used the search bar)
    const orderedRooms: RoomInt[] = [...roomsList];
    switch (activeFilter) {
      case "Room Nr.":
        orderedRooms.sort((a: RoomInt, b: RoomInt) => {
          const roomA: string = a.room_number;
          const roomB: string = b.room_number;
          if (roomA < roomB) {
            return -1;
          }
          if (roomA > roomB) {
            return 1;
          }
          return 0;
        });
        break;
      case "Highest rate first":
        orderedRooms.sort((a: RoomInt, b: RoomInt) => {
          const rateA: string = a.room_rate;
          const rateB: string = b.room_rate;
          if (rateA > rateB) {
            return -1;
          }
          if (rateA < rateB) {
            return 1;
          }
          return 0;
        });
        break;
      case "Lowest rate first":
        orderedRooms.sort((a: RoomInt, b: RoomInt) => {
          const rateA: string = a.room_rate;
          const rateB: string = b.room_rate;
          if (rateA < rateB) {
            return -1;
          }
          if (rateA > rateB) {
            return 1;
          }
          return 0;
        });
        break;
      default:
        break;
    }
    setRooms(orderedRooms);
  }, [activeFilter, roomsList]);

  // Variables for the pagination component
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [roomsPerPage] = useState<number>(10);
  const indexOfLastImage: number = currentPage * roomsPerPage; // For example: let´s say we have 17 pages. indexOfLastImage = 17 * roomsPerPage
  const indexOfFirstImage: number = indexOfLastImage - roomsPerPage; // Following same example: indexOfFirstImage = indexOfLastPage – roomsPerPage
  // Setting the current displayed images
  useEffect(() => {
    setCurrentRooms(rooms.slice(indexOfFirstImage, indexOfLastImage));
  }, [rooms, indexOfFirstImage, indexOfLastImage]);

  // Images to be displayed on the current page. slice(96, 102) will return images from index 96 to 101
  const nPages: number = Math.ceil(rooms.length / roomsPerPage);

  // Function to help with reordering the result after dragging
  const reorder = (list: RoomInt[], startIndex: number, endIndex: number) => {
    // Check AQUI NO FUNCIONA
    const result: RoomInt[] = Array.from(list);
    const [removed]: RoomInt[] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  // Function to manage the drag event
  const onDragEnd = (result: RoomInt[] | any): void => {
    const { source, destination }: any = result;
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
                      currentRooms.map((room, index: number) => (
                        <RoomRow key={index} index={index} room={room} />
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
