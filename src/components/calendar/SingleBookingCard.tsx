// React & Router
import { useNavigate } from "react-router";

// Styled Components
import { Card, CardData } from "./SingleBookingCardStyled";

interface SingleDate {
  checkIn: string;
  checkOut: string;
}

export const SingleBookingCard = ({
  checkIn,
  checkOut,
  userName,
  bedType,
  id,
  photo,
}: any) => {
  const navigate = useNavigate();

  const goToSingleBooking = (id: number): void => {
    navigate("/bookings/" + id);
  };

  return (
    <Card
      onClick={() => {
        goToSingleBooking(id);
      }}
    >
      <img src={photo} alt="Room img" />
      <CardData>
        <h2>{userName}</h2>
        <p>{bedType}</p>
      </CardData>
      <CardData style={{ marginLeft: "auto" }}>
        <p>
          <span style={{ color: "#393939" }}>Check In: </span>
          {checkIn}
        </p>
        <p>
          <span style={{ color: "#393939" }}>Check Out: </span>
          {checkOut}
        </p>
      </CardData>
    </Card>
  );
};
