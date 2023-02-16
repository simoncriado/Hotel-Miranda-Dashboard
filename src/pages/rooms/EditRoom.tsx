// React
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

// Redux
import { getRoom, editRoom } from "../../features/rooms/roomsSlice";

// Components
import RoomForm from "../../components/rooms/RoomForm";
import { Loader } from "../../components/styled/Loader";

// TypeScript
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RoomInt } from "../../interfaces/RoomInt";

type RoomsType = {
  singleRoom: RoomInt | null | undefined | any;
};

const EditRoom = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { roomId } = params;
  const { singleRoom } = useAppSelector<RoomsType>(
    (state) => state.roomsReducer
  );

  const [currentRoom, setCurrentRoom] = useState<RoomInt | any>(null);
  const formTitle: string =
    "Here you can edit the fields needed and save them to update the original room";

  useEffect(() => {
    if (singleRoom === null) {
      dispatch(getRoom(Number(roomId)));
    } else if (singleRoom !== null && singleRoom.roomID !== Number(roomId)) {
      dispatch(getRoom(Number(roomId)));
    }

    setCurrentRoom(singleRoom);
  }, [singleRoom, dispatch, roomId]);

  const handleInput = (event: any) => {
    const { name, value, type, checked } = event.target;
    let valToUpdate: string | string[];
    if (type === "checkbox") {
      const newVal: string[] = [...currentRoom[name]];
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
    setCurrentRoom((prevState: RoomInt) => ({
      ...prevState,
      [name]: valToUpdate,
    }));
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentRoom({});
    navigate("/rooms");
  };

  const handleSubmit = (): void => {
    dispatch(editRoom(currentRoom));
    setCurrentRoom({});
    navigate("/rooms");
  };

  return !currentRoom ? (
    <Loader />
  ) : (
    <RoomForm
      formTitle={formTitle}
      currentRoom={currentRoom}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
    />
  );
};

export default EditRoom;
