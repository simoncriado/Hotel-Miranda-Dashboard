// React
import React, { useState } from "react";
import { useNavigate } from "react-router";

// Redux
import { useDispatch } from "react-redux";
import { createNewBooking } from "../../features/bookings/bookingsSlice";

// Styled Components
import {
  LoginContainer,
  LoginCard,
  InputContainer,
  Input,
  LoginButton,
  Description,
} from "../../pages/login/LoginStyled";

const NewBooking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userPicture, setUserPicture] = useState("");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [specialRequest, setSpecialRequest] = useState(null);
  const [roomType, setRoomType] = useState("");
  const [status, setStatus] = useState("");

  const createBooking = (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 100000);
    const bookingID = Math.floor(Math.random() * 10000000);
    const orderDate = new Date().toLocaleString("en-GB");
    const newBooking = {
      id: id,
      bookingID: bookingID,
      user: {
        name: userName,
        picture: userPicture.length
          ? userPicture
          : "https://corporate.bestbuy.com/wp-content/uploads/2022/06/Image-Portrait-Placeholder.jpg",
      },
      orderDate: orderDate,
      checkIn: { date: checkIn },
      checkOut: { date: checkOut },
      specialRequest: specialRequest,
      roomType: roomType,
      status: status,
    };
    dispatch(createNewBooking(newBooking));
    navigate("/bookings");
  };
  return (
    <>
      <LoginContainer style={{ minHeight: "80%" }}>
        <LoginCard style={{ height: "fit-content" }}>
          <Description>Fill the form to create a new booking</Description>
          <form>
            <InputContainer>
              <Input
                type="text"
                className="input-user"
                value={userName}
                placeholder="User Name"
                onChange={(e) => setUserName(e.target.value)}
              ></Input>
            </InputContainer>
            <InputContainer>
              <Input
                className="input-user"
                value={userPicture}
                placeholder="Copy your photo URL"
                onChange={(e) => setUserPicture(e.target.value)}
              ></Input>
            </InputContainer>
            <InputContainer>
              <Input
                style={{ color: "#777777" }}
                type="date"
                className="input-user"
                placeholder="dd-mm-yyyy"
                min={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setCheckIn(e.target.value)}
              ></Input>
            </InputContainer>
            <InputContainer>
              <Input
                style={{ color: "#777777" }}
                type="date"
                className="input-user"
                placeholder="dd-mm-yyyy"
                onChange={(e) => setCheckOut(e.target.value)}
              ></Input>
            </InputContainer>
            <InputContainer>
              <Input
                type="text"
                className="input-user"
                placeholder="Special request"
                onChange={(e) => setSpecialRequest(e.target.value)}
              ></Input>
            </InputContainer>
            <InputContainer>
              <Input
                type="text"
                className="input-user"
                placeholder="Room type"
                onChange={(e) => setRoomType(e.target.value)}
              ></Input>
            </InputContainer>
            <InputContainer>
              <Input
                type="text"
                className="input-user"
                placeholder="Booking status"
                onChange={(e) => setStatus(e.target.value)}
              ></Input>
            </InputContainer>
            <LoginButton
              type="login"
              text="LOGIN"
              onClick={(e) => {
                createBooking(e);
              }}
            >
              Save
            </LoginButton>
          </form>
        </LoginCard>
      </LoginContainer>
    </>
  );
};

export default NewBooking;
