// React
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { editBooking } from "../../features/bookings/bookingsSlice";

// Components
import BookingForm from "../../components/bookings/BookingForm";

const EditBooking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleBooking } = useSelector((state) => state.bookingsReducer);
  const [currentBooking, setCurrentBooking] = useState(singleBooking);

  useEffect(() => {
    setCurrentBooking(singleBooking);
  }, [singleBooking]);

  //   useEffect dispatch getBooking
  const handleInput = (event) => {
    const { name, value } = event.target;
    setCurrentBooking((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(editBooking(currentBooking));
    navigate("/bookings");
  };
  return currentBooking ? (
    <BookingForm
      currentBooking={currentBooking}
      handleInput={handleInput}
      editSubmit={handleSubmit}
    />
  ) : null;
};

export default EditBooking;
