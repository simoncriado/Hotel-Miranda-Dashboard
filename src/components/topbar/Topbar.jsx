// React & Router
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

// Styled Components
import {
  TopbarContainer,
  TopbarTitle,
  IconContainer,
  Icon,
} from "./TopbarStyled";

// Topbar component. It gets the title from the url dinamically to update the current page header
const Topbar = ({ setAuth }) => {
  let location = useLocation();
  const [title, setTitle] = useState("");

  const goLogin = () => {
    localStorage.removeItem("auth");
    setAuth(false);
  };

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setTitle("Dashboard");
        break;
      case "/bookings":
        setTitle("Bookings");
        break;
      case "/rooms":
        setTitle("Rooms");
        break;
      case "/contact":
        setTitle("Contact");
        break;
      case "/users":
        setTitle("Users");
        break;
      default:
        setTitle("");
    }
  }, [location]);

  return (
    <TopbarContainer>
      <TopbarTitle>
        <p>{title}</p>
      </TopbarTitle>

      <IconContainer>
        <Icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="3rem"
            width="3rem"
            viewBox="0 0 48 48"
          >
            <path d="M7 40q-1.2 0-2.1-.9Q4 38.2 4 37V11q0-1.2.9-2.1Q5.8 8 7 8h34q1.2 0 2.1.9.9.9.9 2.1v26q0 1.2-.9 2.1-.9.9-2.1.9Zm17-15.1L7 13.75V37h34V13.75Zm0-3L40.8 11H7.25ZM7 13.75V11v26Z" />
          </svg>
          <div className="notification">
            <p>2</p>
          </div>
        </Icon>
        {/* ATM THE ANIMATION IS ACTIVATED ON HOVER. LATER I WANT TO ACTIVATE THE ANIMATION WHEN A NEW NOTIFICATION COMES IN. I GUESS I WILL USE JS TO ADD THE CLASS DINAMICALLY ON INCOMING NOTIFICATION */}
        <Icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="3rem"
            width="3rem"
            viewBox="0 0 48 48"
            className="ring"
          >
            <path d="M8 38v-3h4.2V19.7q0-4.2 2.475-7.475Q17.15 8.95 21.2 8.1V6.65q0-1.15.825-1.9T24 4q1.15 0 1.975.75.825.75.825 1.9V8.1q4.05.85 6.55 4.125t2.5 7.475V35H40v3Zm16-14.75ZM24 44q-1.6 0-2.8-1.175Q20 41.65 20 40h8q0 1.65-1.175 2.825Q25.65 44 24 44Zm-8.8-9h17.65V19.7q0-3.7-2.55-6.3-2.55-2.6-6.25-2.6t-6.275 2.6Q15.2 16 15.2 19.7Z" />
          </svg>
          <div className="hithere">
            <p>115</p>
          </div>
        </Icon>
        <Icon onClick={goLogin}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="3rem"
            width="3rem"
            viewBox="0 0 48 48"
            className="wobble"
          >
            <path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h14.55v3H9v30h14.55v3Zm24.3-9.25-2.15-2.15 5.1-5.1h-17.5v-3h17.4l-5.1-5.1 2.15-2.15 8.8 8.8Z" />
          </svg>
        </Icon>
      </IconContainer>
    </TopbarContainer>
  );
};

export default Topbar;
