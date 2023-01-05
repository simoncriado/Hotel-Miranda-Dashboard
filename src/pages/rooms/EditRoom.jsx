// React
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getRoom, editRoom } from "../../features/rooms/roomsSlice";

// Components
import RoomForm from "../../components/rooms/RoomForm";
import { Loader } from "../../components/styled/Loader";

const EditRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { roomId } = params;
  const { singleRoom } = useSelector((state) => state.roomsReducer);

  const [currentRoom, setCurrentRoom] = useState(singleRoom);
  const formTitle =
    "Here you can edit the fields needed and save them to update the original room";

  useEffect(() => {
    dispatch(getRoom(roomId));

    setCurrentRoom(singleRoom);
  }, [singleRoom, dispatch, roomId]);

  // I need to make that amenities is preloaded with the room_facilities comming from the currentRoom. HOW?
  const [amenities, setAmenities] = useState([]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    if (name === "room_facilities") {
      if (currentRoom.room_facilities.includes(value)) {
        const index = amenities.indexOf(value);
        amenities.splice(index, 1);
      } else {
        amenities.push(value);
      }
      setCurrentRoom((prevState) => ({
        ...prevState,
        [name]: amenities,
      }));
    } else {
      setCurrentRoom((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = () => {
    console.log(currentRoom.room_facilities);
    // dispatch(editRoom(currentRoom));
    // navigate("/rooms");
  };

  return !currentRoom ? (
    <Loader />
  ) : (
    <RoomForm
      formTitle={formTitle}
      currentRoom={currentRoom}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
    />
  );
};

export default EditRoom;
