// React
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

// Redux
import { getBooking, editBooking } from "../../features/bookings/bookingsSlice";

// Components
import BookingForm from "../../components/bookings/BookingForm";
import { Loader } from "../../components/styled/Loader";

// TypeScript
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { BookingInt } from "../../interfaces/BookingInt";

type BookingsType = {
  singleBooking: BookingInt | null | undefined;
};

const EditBooking = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { bookingId } = params;
  const { singleBooking } = useAppSelector<BookingsType>(
    (state) => state.bookingsReducer
  );

  // const { singleBooking } = useSelector((state) => state.bookingsReducer);
  const [currentBooking, setCurrentBooking] = useState<BookingInt | any>(null);
  const formTitle: string =
    "Here you can edit the fields needed and save them to update the original booking";

  useEffect(() => {
    dispatch(getBooking(Number(bookingId)));

    setCurrentBooking(singleBooking);
  }, [singleBooking, dispatch, bookingId]);

  // Using type "any" for the event as I found no other working option
  const handleInput = (event: any): void => {
    const { name, value } = event.target;
    setCurrentBooking((prevState: BookingInt) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancel = (e: Event): void => {
    e.preventDefault();
    setCurrentBooking({});
    navigate("/bookings");
  };

  const handleSubmit = (): void => {
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
