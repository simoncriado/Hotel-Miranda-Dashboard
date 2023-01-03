// React & Router
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Local Data
// import BookingsList from "../../data/bookings";

// Redux
import { useSelector } from "react-redux";

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
} from "./SingleBookingStyled";
import {
  GuestContainer,
  GuestName,
  BookingID,
} from "../../components/bookings/BookingRowStyled";
import SingleBookingSwiper from "../../components/bookings/SingleBookingSwiper";

// Component that displays the data for the selected room
const SingleBooking = () => {
  const params = useParams();
  const { bookingId } = params;
  const { bookingsList } = useSelector((state) => state.bookingsReducer);
  const [filteredBooking, setFilteredBooking] = useState([]);

  useEffect(() => {
    const booking = bookingsList.filter(
      (booking) => booking.bookingID.toString() === bookingId
    );
    setFilteredBooking(booking);
  }, [bookingId, bookingsList]);

  if (filteredBooking[0]) {
    return (
      <Container style={{ flexDirection: "row" }}>
        <Subcontainer>
          <GuestContainer>
            <img
              style={{ width: 150, height: 150 }}
              src={filteredBooking[0].user.picture}
              alt="User portrait"
            />
            <div>
              <GuestName>{filteredBooking[0].user.name}</GuestName>
              <BookingID>ID {filteredBooking[0].bookingID}</BookingID>
            </div>
          </GuestContainer>
          <BookingDataContainer>
            <BookingDataSubcontainer>
              <Title>Check In</Title>
              <Data>{filteredBooking[0].checkIn.date}</Data>
            </BookingDataSubcontainer>
            <BookingDataSubcontainer>
              <Title>Check Out</Title>
              <Data>{filteredBooking[0].checkOut.date}</Data>
            </BookingDataSubcontainer>
          </BookingDataContainer>
          <Divider />
          <BookingDataContainer>
            <BookingDataSubcontainer>
              <Title>Room info</Title>
              <Data>{filteredBooking[0].roomType}</Data>
            </BookingDataSubcontainer>
            <BookingDataSubcontainer>
              <Title>Price</Title>
              <Data>
                $145
                <span> /night</span>
              </Data>
            </BookingDataSubcontainer>
          </BookingDataContainer>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </Text>
          <BookingDataContainer>
            <BookingDataSubcontainer style={{ width: "100%" }}>
              <Title>Facilities</Title>
              <Facilities>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="25"
                    width="25"
                    viewBox="0 0 48 48"
                  >
                    <path d="M8.8 38H7.3l-1-4H4V23.3q0-1.3.85-2.2.85-.9 2.15-.9h1.3V13q0-1.25.875-2.125T11.3 10h25.35q1.25 0 2.125.875T39.65 13v7.2H41q1.25 0 2.125.875T44 23.2V34h-2.3l-1 4h-1.5l-1-4H9.85Zm16.7-17.8h11.15V13H25.5Zm-14.2 0h11.2V13H11.3ZM7 31h34v-7.8H7Zm34 0H7h34Z" />
                  </svg>
                  3 Bed Space
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="25"
                    width="25"
                    viewBox="0 0 48 48"
                  >
                    <path d="m21.8 30.65 11.4-11.4-2.1-2.05-9.15 9.15-5.05-5.05-2.2 2.2Zm2.2 13.3q-7-1.75-11.5-8.125T8 21.85V9.95l16-6 16 6v11.9q0 7.6-4.5 13.975T24 43.95Zm0-3.1q5.75-1.9 9.375-7.175T37 21.85v-9.8l-13-4.9-13 4.9v9.8q0 6.55 3.625 11.825Q18.25 38.95 24 40.85ZM24 24Z" />
                  </svg>
                  24 Hours Guard
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="25"
                    width="25"
                    viewBox="0 0 48 48"
                  >
                    <path d="M11.6 30.15 8.45 27q3.5-3.5 7.325-5.25T24 20q4.4 0 8.225 1.75Q36.05 23.5 39.55 27l-3.15 3.15q-3.05-3.05-6.15-4.35-3.1-1.3-6.25-1.3t-6.25 1.3q-3.1 1.3-6.15 4.35ZM3.15 21.7 0 18.55q4.65-4.75 10.825-7.65Q17 8 24 8q7 0 13.175 2.9Q43.35 13.8 48 18.55l-3.15 3.15q-4.4-4.2-9.625-6.7T24 12.5q-6 0-11.225 2.5T3.15 21.7ZM24 42.55l7.4-7.45q-1.45-1.45-3.325-2.275Q26.2 32 24 32t-4.075.825Q18.05 33.65 16.6 35.1Z" />
                  </svg>
                  Free Wifi
                </div>
                <div>2 Bathroom</div>
                <div>Air Conditioner</div>
                <div>Television</div>
              </Facilities>
            </BookingDataSubcontainer>
          </BookingDataContainer>
        </Subcontainer>
        <Subcontainer style={{ padding: 0 }}>
          <SwiperContainer>
            <Tag $type={filteredBooking[0].status} className="tag">
              {filteredBooking[0].status}
            </Tag>
            <SingleBookingSwiper />
            <div className="roomData">
              <h2>Bed Room</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
            </div>
          </SwiperContainer>
        </Subcontainer>
      </Container>
    );
  } else {
    return <div>Loading single booking</div>;
  }
};

export default SingleBooking;
