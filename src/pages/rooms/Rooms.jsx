// React
import React from "react";
import { useState } from "react";

// DnD
import { DragDropContext, Droppable } from "react-beautiful-dnd";

// Local data
import RoomsList from "../../data/rooms";

// Styles
import { Table, HeaderTitle } from "../../components/styled/Tables";
import { Container } from "../../components/styled/Containers";

// Components
import { RoomRow } from "../../components/rooms/RoomRow";

// Component that creates a table and add a row for each item in the data base
const Rooms = () => {
  const [rooms, setRooms] = useState(RoomsList);

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
                {rooms.length > 0 &&
                  rooms.map((room, index) => (
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
    </DragDropContext>
  );
};

export default Rooms;
