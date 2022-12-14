// React
import React from "react";
import { useState } from "react";

// DnD
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(rooms, result.source.index, result.destination.index);

    setRooms({
      items,
    });
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

          <tbody>
            {rooms.length > 0 &&
              rooms.map((room, index) => (
                <RoomRow
                  key={room.id}
                  index={index}
                  room={room}
                  number={room.id}
                />
              ))}
          </tbody>
        </Table>
      </Container>
    </DragDropContext>
  );
};

export default Rooms;
