// React
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getBooking, editBooking } from "../../features/bookings/bookingsSlice";

// Components
import BookingForm from "../../components/bookings/BookingForm";
import { Loader } from "../../components/styled/Loader";

const EditBooking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { bookingId } = params;
  const { singleBooking } = useSelector((state) => state.bookingsReducer);

  // const { singleBooking } = useSelector((state) => state.bookingsReducer);
  const [currentBooking, setCurrentBooking] = useState(null);
  const formTitle =
    "Here you can edit the fields needed and save them to update the original booking";

  useEffect(() => {
    dispatch(getBooking(Number(bookingId)));

    setCurrentBooking(singleBooking);
  }, [singleBooking, dispatch, bookingId]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setCurrentBooking((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCancel = () => {
    setCurrentBooking({});
    navigate("/bookings");
  };

  const handleSubmit = () => {
    dispatch(editBooking(currentBooking));
    setCurrentBooking({});
    navigate("/bookings");
  };
  return !currentBooking ? (
    <Loader />
  ) : (
    <BookingForm
      formTitle={formTitle}
      currentBooking={currentBooking}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
    />
  );
};

export default EditBooking;
