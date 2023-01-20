// React
import { useState } from "react";
import { useNavigate } from "react-router";

// Redux
import { createNewBooking } from "../../features/bookings/bookingsSlice";

// Components
import BookingForm from "../../components/bookings/BookingForm";

// TypeScript
import { useAppDispatch } from "../../app/hooks";
import { BookingInt } from "../../interfaces/BookingInt";

const NewBooking = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formTitle: string = "Please fill the form to create a new booking";

  const [currentBooking, setCurrentBooking] = useState<BookingInt>({
    id: Math.floor(Math.random() * 100000),
    bookingID: Math.floor(Math.random() * 10000000),
    orderDate: new Date().toLocaleString("en-GB"),
    userName: "",
    userPicture: "",
    checkIn: "",
    checkOut: "",
    specialRequest: "",
    roomType: "",
    status: "",
  });

  const handleInput = (event: any): void => {
    const { name, value } = event.target;
    setCurrentBooking((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCancel = (e: Event): void => {
    e.preventDefault();
    navigate("/bookings");
  };

  const handleSubmit = (): void => {
    dispatch(createNewBooking(currentBooking));
    navigate("/bookings");
  };
  return (
    <BookingForm
      formTitle={formTitle}
      currentBooking={currentBooking}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
    />
  );
};

export default NewBooking;
