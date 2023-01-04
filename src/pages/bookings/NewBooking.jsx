// React
import React, { useState } from "react";
import { useNavigate } from "react-router";

// Redux
import { useDispatch } from "react-redux";
import { createNewBooking } from "../../features/bookings/bookingsSlice";

// Components
import BookingForm from "../../components/bookings/BookingForm";

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
      userName: userName,
      userPicture: userPicture.length
        ? userPicture
        : "https://corporate.bestbuy.com/wp-content/uploads/2022/06/Image-Portrait-Placeholder.jpg",
      orderDate: orderDate,
      checkIn: checkIn,
      checkOut: checkOut,
      specialRequest: specialRequest,
      roomType: roomType,
      status: status,
    };
    dispatch(createNewBooking(newBooking));
    navigate("/bookings");
  };
  return (
    <BookingForm
      userName={userName}
      setUserName={setUserName}
      userPicture={userPicture}
      setUserPicture={setUserPicture}
      setCheckIn={setCheckIn}
      setCheckOut={setCheckOut}
      setSpecialRequest={setSpecialRequest}
      setRoomType={setRoomType}
      setStatus={setStatus}
      createBooking={createBooking}
    />
  );
};

export default NewBooking;
