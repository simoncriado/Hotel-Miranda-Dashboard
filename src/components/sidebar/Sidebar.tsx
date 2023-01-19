// React & Router
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

// Styled Components
import {
  SidebarContainer,
  LogoContainer,
  Navigation,
  ArrowButton,
  UserCard,
  NavigationDescription,
  NavigationRights,
  NavigationAuthor,
  Link,
} from "./SidebarStyled";

// Components & Assets
import CurrentUser from "./CurrentUser";
import Logo from "../logo/Logo";
const Portrait = require("../../assets/images/user-one.jpg");
// const Heart = require("../../assets/icons/heart-icon.svg");
// const MenuOpen = require("../../assets/icons/heart-icon.svg");
// const Menu = require("../../assets/icons/heart-icon.svg");
// import Portrait from "../../assets/images/user-one.jpg";
// import Heart from "../../assets/icons/heart-icon.svg";
// import MenuOpen from "../../assets/icons/heart-icon.svg";
// import Menu from "../../assets/icons/heart-icon.svg";

// Sidebar component. When hidden the width and height get reduced to 0 so that it is not visible
const Sidebar = () => {
  let user: object = {
    photo: Portrait,
    name: "User One",
    email: "user.one@gmail.com",
  };

  const [display, setDisplay] = useState<boolean>(false);
  const location = useLocation();

  const displayMenu = (): void => {
    setDisplay(!display);
  };

  return (
    <SidebarContainer
      display={display ? "380px" : "0px"}
      adjustHeight={display ? "100%" : 0}
    >
      <ArrowButton onClick={displayMenu}>
        {!display ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            width="30"
            viewBox="0 0 48 48"
          >
            <path d="M5.15 37.4v-4.7h37.7v4.7Zm0-11.05v-4.7h37.7v4.7Zm0-11.05v-4.75h37.7v4.75Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            width="30"
            viewBox="0 0 48 48"
          >
            <path d="M4 37.4v-4.7h27.7v4.7Zm36.75-2.8L30.1 23.95l10.6-10.6 3.35 3.35-7.25 7.25 7.3 7.3ZM4 26.25v-4.7h21.7v4.7ZM4 15.3v-4.75h27.7v4.75Z" />
          </svg>
        )}
      </ArrowButton>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <Navigation>
        <ul>
          <Link route="/" current={location.pathname}>
            <NavLink to="/">
              <div></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                width="30"
                viewBox="0 0 48 48"
              >
                <path d="M25.5 19.5V6H42v13.5ZM6 25.5V6h16.5v19.5ZM25.5 42V22.5H42V42ZM6 42V28.5h16.5V42Zm3-19.5h10.5V9H9ZM28.5 39H39V25.5H28.5Zm0-22.5H39V9H28.5ZM9 39h10.5v-7.5H9Zm10.5-16.5Zm9-6Zm0 9Zm-9 6Z" />
              </svg>
              <p>Dashboard</p>
            </NavLink>
          </Link>

          <Link route="/bookings" current={location.pathname}>
            <NavLink to="/bookings">
              <div></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                width="30"
                viewBox="0 0 48 48"
              >
                <path d="m21.65 36.6-6.9-6.85 2.1-2.1 4.8 4.7 9.2-9.2 2.1 2.15ZM9 44q-1.2 0-2.1-.9Q6 42.2 6 41V10q0-1.2.9-2.1Q7.8 7 9 7h3.25V4h3.25v3h17V4h3.25v3H39q1.2 0 2.1.9.9.9.9 2.1v31q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V19.5H9V41Zm0-24.5h30V10H9Zm0 0V10v6.5Z" />
              </svg>
              <p>Bookings</p>
            </NavLink>
          </Link>

          <Link route="/rooms" current={location.pathname}>
            <NavLink to="/rooms">
              <div></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                width="30"
                viewBox="0 0 48 48"
              >
                <path d="M14 27.4q-1.4 0-2.4-1t-1-2.4q0-1.4 1-2.4t2.4-1q1.4 0 2.4 1t1 2.4q0 1.4-1 2.4t-2.4 1Zm0 8.6q-5 0-8.5-3.5T2 24q0-5 3.5-8.5T14 12q3.6 0 6.3 1.7 2.7 1.7 4.25 5.15h17.8L48 24.5l-8.35 7.65-4.4-3.2-4.4 3.2-3.75-3h-2.55q-1.25 3-3.925 4.925Q17.95 36 14 36Zm0-3q2.9 0 5.35-1.925 2.45-1.925 3.15-4.925h5.7l2.7 2.25 4.4-3.15 4.1 3.1 4.25-3.95-2.55-2.55H22.5q-.6-2.8-3-4.825Q17.1 15 14 15q-3.75 0-6.375 2.625T5 24q0 3.75 2.625 6.375T14 33Z" />
              </svg>
              <p>Rooms</p>
            </NavLink>
          </Link>

          <Link route="/contact" current={location.pathname}>
            <NavLink to="/contact">
              <div></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                width="30"
                viewBox="0 0 48 48"
              >
                <path d="M17.45 42.95H8.7q-1.45 0-2.55-1.1-1.1-1.1-1.1-2.55v-8.45q2.3-.25 3.9-1.875t1.6-3.925q0-2.3-1.6-3.925t-3.9-1.875v-8.5q0-1.45 1.1-2.55 1.1-1.1 2.55-1.1h8.6q.55-2.15 2.1-3.625T23.05 2q2.1 0 3.65 1.475Q28.25 4.95 28.8 7.1h8.45q1.45 0 2.55 1.1 1.1 1.1 1.1 2.55v8.45q2.15.55 3.55 2.2 1.4 1.65 1.4 3.75t-1.4 3.575q-1.4 1.475-3.55 2.025v8.55q0 1.45-1.1 2.55-1.1 1.1-2.55 1.1h-8.8q-.1-2.65-1.675-4.325Q25.2 36.95 22.95 36.95q-2.2 0-3.8 1.675-1.6 1.675-1.7 4.325ZM8.7 39.3h5.8q1.2-3.1 3.575-4.55 2.375-1.45 4.875-1.45t4.9 1.45q2.4 1.45 3.65 4.55h5.75V27.45h2.65q1 0 1.65-.65.65-.65.65-1.65 0-1-.65-1.65-.65-.65-1.65-.65h-2.65v-12.1h-11.9v-2.8q0-1-.65-1.65-.65-.65-1.65-.65-1 0-1.65.65-.65.65-.65 1.65v2.8H8.7v5.75q2.45 1.25 3.975 3.525T14.2 25.05q0 2.75-1.525 5.025Q11.15 32.35 8.7 33.55Zm16.8-16.85Z" />
              </svg>
              <p>Contact</p>
            </NavLink>
          </Link>

          <Link route="/users" current={location.pathname}>
            <NavLink to="/users">
              <div></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30"
                width="30"
                viewBox="0 0 48 48"
              >
                <path d="M1.9 40v-4.7q0-1.75.9-3.175Q3.7 30.7 5.3 30q3.65-1.6 6.575-2.3Q14.8 27 17.9 27q3.1 0 6 .7t6.55 2.3q1.6.7 2.525 2.125.925 1.425.925 3.175V40Zm35 0v-4.7q0-3.15-1.6-5.175t-4.2-3.275q3.45.4 6.5 1.175t4.95 1.775q1.65.95 2.6 2.35.95 1.4.95 3.15V40Zm-19-16.05q-3.3 0-5.4-2.1-2.1-2.1-2.1-5.4 0-3.3 2.1-5.4 2.1-2.1 5.4-2.1 3.3 0 5.4 2.1 2.1 2.1 2.1 5.4 0 3.3-2.1 5.4-2.1 2.1-5.4 2.1Zm18-7.5q0 3.3-2.1 5.4-2.1 2.1-5.4 2.1-.55 0-1.225-.075T25.95 23.6q1.2-1.25 1.825-3.075.625-1.825.625-4.075t-.625-3.975Q27.15 10.75 25.95 9.3q.55-.15 1.225-.25t1.225-.1q3.3 0 5.4 2.1 2.1 2.1 2.1 5.4ZM4.9 37h26v-1.7q0-.8-.475-1.55T29.25 32.7q-3.6-1.6-6.05-2.15-2.45-.55-5.3-.55-2.85 0-5.325.55T6.5 32.7q-.7.3-1.15 1.05-.45.75-.45 1.55Zm13-16.05q1.95 0 3.225-1.275Q22.4 18.4 22.4 16.45q0-1.95-1.275-3.225Q19.85 11.95 17.9 11.95q-1.95 0-3.225 1.275Q13.4 14.5 13.4 16.45q0 1.95 1.275 3.225Q15.95 20.95 17.9 20.95Zm0 16.05Zm0-20.55Z" />
              </svg>
              <p>Users</p>
            </NavLink>
          </Link>
        </ul>
      </Navigation>

      <UserCard>
        <CurrentUser photo={user}></CurrentUser>
      </UserCard>

      <NavigationDescription>
        Hotel Miranda Admin Dashboard
      </NavigationDescription>
      <NavigationRights>@2022 All Rights Reserved</NavigationRights>
      <NavigationAuthor>
        Made with{" "}
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="2rem"
            width="2rem"
            viewBox="0 0 48 48"
            fill="#799283"
          >
            <path d="m24 41.95-2.05-1.85q-5.3-4.85-8.75-8.375-3.45-3.525-5.5-6.3T4.825 20.4Q4 18.15 4 15.85q0-4.5 3.025-7.525Q10.05 5.3 14.5 5.3q2.85 0 5.275 1.35Q22.2 8 24 10.55q2.1-2.7 4.45-3.975T33.5 5.3q4.45 0 7.475 3.025Q44 11.35 44 15.85q0 2.3-.825 4.55T40.3 25.425q-2.05 2.775-5.5 6.3T26.05 40.1Z" />
          </svg>
        </span>{" "}
        by Simon Criado
      </NavigationAuthor>
    </SidebarContainer>
  );
};
export default Sidebar;
