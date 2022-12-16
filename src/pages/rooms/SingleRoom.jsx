// React & Router
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Data
import RoomsList from "../../data/rooms";

// Component that displays the data for the selected room
const SingleRoom = () => {
  const params = useParams();
  const { roomId } = params;
  const [filteredRoom, setFilteredRoom] = useState([]);

  useEffect(() => {
    const room = RoomsList.filter((room) => room.id === roomId);
    setFilteredRoom(room);
  }, [roomId]);

  if (filteredRoom[0]) {
    return (
      <div style={{ fontSize: 30 }}>
        This are the details for ROOM <strong>{filteredRoom[0].id}</strong>
      </div>
    );
  } else {
    return <div>Loading single room</div>;
  }
};

export default SingleRoom;
