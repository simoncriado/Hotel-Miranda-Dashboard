// React & Router
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

// Styles
import {
  LoginContainer,
  LoginCard,
  LogoContainer,
  InputContainer,
  Input,
  LoginButton,
  Description,
} from "./LoginStyled";

// Components
import { LogoIcon, LogoLetter } from "../../components/logo/LogoStyled";

// Login page. Checks if the entered data is equal to the hard coded one. If yes it gets stored in localStorage so that I can make the dynamic routes in App.js
const Login = ({ auth, setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hardCodedMail = "test@test.com";
  const hardCodedPassword = "12345";

  const validateLogin = () => {
    if (hardCodedMail === email && hardCodedPassword === password) {
      localStorage.setItem(
        "auth",
        JSON.stringify({ auth: true, email: email })
      );
      setAuth(true);
    } else {
      alert("Email or password are not correct! Please try again...");
    }
  };

  if (auth) {
    return <Navigate to="/"></Navigate>;
  } else {
    return (
      <LoginContainer>
        <LoginCard>
          <LogoContainer>
            <LogoIcon>
              <LogoLetter>H</LogoLetter>
            </LogoIcon>
          </LogoContainer>
          <Description>
            Please use <strong>test@test.com</strong> and <strong>12345</strong>{" "}
            as login data for testing purposes and keep in mind that this
            Website is meant to be used on a computer (not a mobile device)
          </Description>
          <form>
            <InputContainer>
              <Input
                type="text"
                className="input-user"
                value={email}
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
            </InputContainer>
            <InputContainer>
              <Input
                type="password"
                className="input-pass"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
            </InputContainer>
            <LoginButton type="login" text="LOGIN" onClick={validateLogin}>
              Login
            </LoginButton>
          </form>
        </LoginCard>
      </LoginContainer>
    );
  }
};

export default Login;
