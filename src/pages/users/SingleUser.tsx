// React & Router
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Redux
import { getUser } from "../../features/users/usersSlice";

// Styled Components
import { Container } from "../../components/styled/Containers";
import {
  Subcontainer,
  BookingDataContainer,
  BookingDataSubcontainer,
  Title,
  Data,
  Divider,
} from "./SingleUserStyled";
import {
  GuestContainer,
  GuestName,
  BookingID,
} from "../../components/bookings/BookingRowStyled";

// TypeScript
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { UserInt } from "../../interfaces/UserInt";

type UsersType = {
  singleUser: UserInt | null | undefined;
};

// Component that displays the data for the selected room
const SingleUser = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { id } = params;
  const { singleUser } = useAppSelector<UsersType>(
    (state) => state.usersReducer
  );
  const [currentUser, setCurrentUser] = useState<UserInt | any>(singleUser);

  useEffect(() => {
    dispatch(getUser(Number(id)));

    setCurrentUser(singleUser);
  }, [singleUser, dispatch, id]);

  if (currentUser) {
    return (
      <Container style={{ width: "80%", flexDirection: "row" }}>
        <Subcontainer style={{ width: "100%" }}>
          <GuestContainer>
            <img
              style={{ width: 150, height: 150 }}
              src={currentUser.photo}
              alt="User portrait"
            />
            <div>
              <GuestName>{currentUser.name}</GuestName>
              <BookingID>ID {currentUser.id}</BookingID>
            </div>
            <div style={{ marginLeft: "18rem" }}>
              <BookingID>{currentUser.email}</BookingID>
              <BookingID>Phone Number: {currentUser.phone}</BookingID>
            </div>
          </GuestContainer>
          <BookingDataContainer>
            <BookingDataSubcontainer>
              <Title>Start date</Title>
              <Data>{currentUser.date}</Data>
            </BookingDataSubcontainer>
            <BookingDataSubcontainer>
              <Title>Current position</Title>
              <Data>{currentUser.position}</Data>
            </BookingDataSubcontainer>
          </BookingDataContainer>
          <Divider />
          <BookingDataContainer>
            <BookingDataSubcontainer>
              <Title>Position description</Title>
              <Data>{currentUser.description}</Data>
            </BookingDataSubcontainer>
            <BookingDataSubcontainer>
              <Title>Status</Title>
              <Data>{currentUser.state}</Data>
            </BookingDataSubcontainer>
          </BookingDataContainer>
        </Subcontainer>
      </Container>
    );
  } else {
    return <div>Loading single user</div>;
  }
};

export default SingleUser;
