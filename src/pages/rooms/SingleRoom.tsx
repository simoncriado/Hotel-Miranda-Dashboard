// React & Router
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Redux
import { getRoom } from "../../features/rooms/roomsSlice";

// Styled Components
import { Container } from "../../components/styled/Containers";
import {
  Subcontainer,
  BookingDataContainer,
  BookingDataSubcontainer,
  Title,
  Data,
  Text,
  Divider,
  Facilities,
  SwiperContainer,
  Tag,
} from "../bookings/SingleBookingStyled";
import {
  GuestContainer,
  GuestName,
  BookingID,
} from "../../components/bookings/BookingRowStyled";
import SingleBookingSwiper from "../../components/bookings/SingleBookingSwiper";

// TypeScript
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RoomInt } from "../../interfaces/RoomInt";

type RoomsType = {
  singleRoom: RoomInt | null | undefined;
};

// Component that displays the data for the selected room
const SingleRoom = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { roomId } = params;
  const { singleRoom } = useAppSelector<RoomsType>(
    (state) => state.roomsReducer
  );
  const [currentRoom, setCurrentRoom] = useState<RoomInt | any>(singleRoom);

  useEffect(() => {
    dispatch(getRoom(String(roomId)));

    setCurrentRoom(singleRoom);
  }, [singleRoom, dispatch, roomId]);

  if (currentRoom) {
    return (
      <Container style={{ flexDirection: "row" }}>
        <Subcontainer>
          <GuestContainer>
            <img
              style={{ width: 150, height: 150 }}
              src={currentRoom.photo}
              alt="User portrait"
            />
            <div>
              <GuestName>Room Nr. {currentRoom.room_number}</GuestName>
              <BookingID>ID {currentRoom.id}</BookingID>
            </div>
          </GuestContainer>
          <BookingDataContainer>
            <BookingDataSubcontainer>
              <Title>Room info</Title>
              <Data>{currentRoom.bed_type}</Data>
            </BookingDataSubcontainer>
            <BookingDataSubcontainer>
              <Title>Room rate</Title>
              <Data>
                {currentRoom.room_rate}
                <span> /night</span>
              </Data>
            </BookingDataSubcontainer>
          </BookingDataContainer>
          <Divider />
          <BookingDataContainer>
            <BookingDataSubcontainer>
              <Title>Offer</Title>
              <Data>
                {currentRoom.discount === "" ? "No" : currentRoom.discount}
              </Data>
            </BookingDataSubcontainer>
            <BookingDataSubcontainer>
              <Title>Discount %</Title>
              <Data>
                {currentRoom.discount === ""
                  ? "-"
                  : `${currentRoom.discountPercent} %`}
              </Data>
            </BookingDataSubcontainer>
            <BookingDataSubcontainer>
              <Title>Offer price</Title>
              <Data>
                {currentRoom.discount === ""
                  ? "-"
                  : currentRoom.room_rate -
                    (currentRoom.room_rate * currentRoom.discountPercent) / 100}
                <span> /night</span>
              </Data>
            </BookingDataSubcontainer>
          </BookingDataContainer>
          {currentRoom.cancellationPolicy ? (
            <Text>{currentRoom.cancellationPolicy}</Text>
          ) : (
            <Text>No cancellation policy was specified for this room.</Text>
          )}
          <BookingDataContainer>
            <BookingDataSubcontainer style={{ width: "100%" }}>
              <Title>Facilities</Title>
              <Facilities>
                {currentRoom.room_facilities.map(
                  (facility: string, index: number) => (
                    <div key={index}>{facility}</div>
                  )
                )}
              </Facilities>
            </BookingDataSubcontainer>
          </BookingDataContainer>
        </Subcontainer>
        <Subcontainer style={{ padding: 0 }}>
          <SwiperContainer>
            <Tag currentStatus={currentRoom.room_status} className="tag">
              {currentRoom.room_status}
            </Tag>
            <SingleBookingSwiper />
            <div className="roomData">
              <h2>{currentRoom.bed_type}</h2>
              {currentRoom.description ? (
                <p>{currentRoom.description}</p>
              ) : (
                <p>No room description available.</p>
              )}
            </div>
          </SwiperContainer>
        </Subcontainer>
      </Container>
    );
  } else {
    return <div>Loading single room</div>;
  }
};

export default SingleRoom;
