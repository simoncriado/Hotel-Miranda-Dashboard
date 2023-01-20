// React
import { useState } from "react";
import { useNavigate } from "react-router";

// Redux
import { createNewRoom } from "../../features/rooms/roomsSlice";

// Components
import RoomForm from "../../components/rooms/RoomForm";

// TypeScript
import { useAppDispatch } from "../../app/hooks";
import { RoomInt } from "../../interfaces/RoomInt";

const NewRoom = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formTitle: string = "Please fill the form to create a new room";

  const [currentRoom, setCurrentRoom] = useState<RoomInt>({
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
    // Using string cause I dont want to give a default value of 0
    room_rate: "",
    discount: "",
    room_offer: "",
    cancellationPolicy: "",
    room_status: "",
    room_facilities: [],
  });

  const handleInput = (event: any): void => {
    const { name, value, checked } = event.target;
    let valToUpdate: string | string[];
    if (name === "room_facilities") {
      const newVal: string[] = [...currentRoom.room_facilities];
      if (checked) {
        newVal.push(value);
      } else {
        const index: number = newVal.indexOf(value);
        newVal.splice(index, 1);
      }
      valToUpdate = newVal;
    } else {
      valToUpdate = value;
    }
    setCurrentRoom((prevState) => ({ ...prevState, [name]: valToUpdate }));
  };

  const handleCancel = (e: Event): void => {
    e.preventDefault();
    navigate("/rooms");
  };

  const handleSubmit = (): void => {
    dispatch(createNewRoom(currentRoom));
    navigate("/rooms");
  };
  return (
    <RoomForm
      formTitle={formTitle}
      currentRoom={currentRoom}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
    />
  );
};

export default NewRoom;
