// React
import React, { useState } from "react";
import { useNavigate } from "react-router";

// Redux
import { useDispatch } from "react-redux";
import { createNewRoom } from "../../features/rooms/roomsSlice";

// Components
import RoomForm from "../../components/rooms/RoomForm";

const NewRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formTitle = "Please fill the form to create a new room";
  const [currentRoom, setCurrentRoom] = useState({
    id: String(Math.floor(Math.random() * 100000)),
    room_number: "",
    bed_type: "",
    photo: "",
    photoTwo: "",
    photoThree: "",
    photoFour: "",
    photoFive: "",
    description: "",
    discountPercent: "",
    room_rate: "",
    discount: "",
    room_offer: "",
    cancellationPolicy: "",
    room_status: "",
    room_facilities: [],
  });

  const [amenities, setAmenities] = useState([]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    if (name === "room_facilities") {
      // if (!amenities.includes(value)) {
      amenities.push(value);
      // }

      // This is useless but if I dont write it VSCode does not like it. Any way around this???
      setAmenities(amenities);

      setCurrentRoom((prevState) => ({
        ...prevState,
        [name]: amenities,
      }));
    } else {
      setCurrentRoom((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = () => {
    dispatch(createNewRoom(currentRoom));
    navigate("/rooms");
  };
  return (
    <RoomForm
      formTitle={formTitle}
      currentRoom={currentRoom}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      setAmenities={setAmenities}
    />
  );
};

export default NewRoom;
