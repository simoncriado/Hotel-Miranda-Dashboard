// React
import React from "react";

// Components
import ReviewsSwiper from "../../components/reviews/Reviews";

// Styles
import {
  DashboardContainer,
  KPI,
  KPIContainer,
  CalendarAndGraph,
  CalendarAndGraphSubcontainer,
  Reviews,
} from "./DashboardStyled";

// Dashboard page
const Dashboard = () => {
  return (
    <DashboardContainer>
      <KPI>
        <KPIContainer>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            width="30"
            viewBox="0 0 48 48"
          >
            <path d="M8.8 38H7.3l-1-4H4V23.3q0-1.3.85-2.2.85-.9 2.15-.9h1.3V13q0-1.25.875-2.125T11.3 10h25.35q1.25 0 2.125.875T39.65 13v7.2H41q1.25 0 2.125.875T44 23.2V34h-2.3l-1 4h-1.5l-1-4H9.85Zm16.7-17.8h11.15V13H25.5Zm-14.2 0h11.2V13H11.3ZM7 31h34v-7.8H7Zm34 0H7h34Z" />
          </svg>
          <div>
            <h2>8,461</h2>
            <p>New Bookings</p>
          </div>
        </KPIContainer>
        <KPIContainer>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            width="30"
            viewBox="0 0 48 48"
          >
            <path d="m21.65 36.6-6.9-6.85 2.1-2.1 4.8 4.7 9.2-9.2 2.1 2.15ZM9 44q-1.2 0-2.1-.9Q6 42.2 6 41V10q0-1.2.9-2.1Q7.8 7 9 7h3.25V4h3.25v3h17V4h3.25v3H39q1.2 0 2.1.9.9.9.9 2.1v31q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V19.5H9V41Zm0-24.5h30V10H9Zm0 0V10v6.5Z" />
          </svg>
          <div>
            <h2>963</h2>
            <p>Scheduled Room</p>
          </div>
        </KPIContainer>
        <KPIContainer>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            width="30"
            viewBox="0 0 48 48"
          >
            <path d="M24.45 42v-3H39V9H24.45V6H39q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm-3.9-9.25L18.4 30.6l5.1-5.1H6v-3h17.4l-5.1-5.1 2.15-2.15 8.8 8.8Z" />
          </svg>
          <div>
            <h2>753</h2>
            <p>Check In</p>
          </div>
        </KPIContainer>
        <KPIContainer>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            width="30"
            viewBox="0 0 48 48"
          >
            <path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h14.55v3H9v30h14.55v3Zm24.3-9.25-2.15-2.15 5.1-5.1h-17.5v-3h17.4l-5.1-5.1 2.15-2.15 8.8 8.8Z" />
          </svg>
          <div>
            <h2>516</h2>
            <p>Check Out</p>
          </div>
        </KPIContainer>
      </KPI>
      <CalendarAndGraph>
        <CalendarAndGraphSubcontainer>
          <p>Calendar under construction...</p>
        </CalendarAndGraphSubcontainer>
        <CalendarAndGraphSubcontainer>
          <p>Stadistics under construction...</p>
        </CalendarAndGraphSubcontainer>
      </CalendarAndGraph>
      <Reviews>
        <p>Latest Reviews by Customers</p>
        <ReviewsSwiper></ReviewsSwiper>
      </Reviews>
    </DashboardContainer>
  );
};

export default Dashboard;
