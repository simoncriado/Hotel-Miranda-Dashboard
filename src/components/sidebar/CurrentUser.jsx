// React & Router
import React from "react";
import { Link } from "react-router-dom";

// Styled Components
import { Card, UserName, UserEmail, LinkButton } from "./CurrentUserStyled";

// User section in sidebar
const LoguedUser = ({ user }) => {
  return (
    <Card>
      <img className="image" src={user.photo} alt="" />
      <UserName>{user.name}</UserName>
      <UserEmail>{user.email}</UserEmail>
      <LinkButton>
        <Link to={"/users/" + user.email}>Edit user</Link>
      </LinkButton>
    </Card>
  );
};

export default LoguedUser;
