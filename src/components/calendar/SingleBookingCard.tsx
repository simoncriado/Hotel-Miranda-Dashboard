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
}: any) => {
  return (
    <Card>
      <img
        src="https://images.unsplash.com/flagged/photo-1556438758-8d49568ce18e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1774&q=80"
        alt="Room img"
      />
      <CardData>
        <h2>{userName}</h2>
        <p>{bedType}</p>
      </CardData>
      <CardData style={{ marginLeft: "auto" }}>
        <p>Check In: {checkIn}</p>
        <p>Check Out: {checkOut}</p>
      </CardData>
    </Card>
  );
};
