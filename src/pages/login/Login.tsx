// React & Router
import React, { useState } from "react";

// React Context
import { useLogin } from "../../hooks/useLogin";

// Styled Components
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

// Login page. Checks if the entered data is equal to the hard coded one. If yes it gets stored in localStorage so that I can make the dynamic routes in App.js. The context gets also updated
const Login = (): JSX.Element => {
  const { login } = useLogin();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  // const hardCodedMail: string = "test@test.com";
  // const hardCodedPassword: string = "12345";

  const validateLogin = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    // const url = process.env.REACT_APP_URI;

    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      mode: "cors",
      cache: "default",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const token = await response.json();

    if (token) {
      login(userName, email);
      localStorage.setItem(
        "auth",
        JSON.stringify({
          auth: true,
          userName: userName,
          email: email,
          token: token,
        })
      );
    } else {
      alert("Email or password are not correct! Please try again...");
    }

    // if (hardCodedMail === email && hardCodedPassword === password) {
    //   login(userName, email);
    //   localStorage.setItem(
    //     "auth",
    //     JSON.stringify({ auth: true, userName: userName, email: email })
    //   );
    // } else {
    //   alert("Email or password are not correct! Please try again...");
    // }
  };

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
          as login data for testing purposes and keep in mind that this Website
          is meant to be used on a computer (not a mobile device)
        </Description>
        <form>
          <InputContainer>
            <Input
              type="text"
              className="input-userName"
              value={userName}
              placeholder="User Name"
              onChange={(e) => setUserName(e.target.value)}
            ></Input>
          </InputContainer>
          <InputContainer>
            <Input
              type="text"
              className="input-email"
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
          <LoginButton
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              validateLogin(e);
            }}
          >
            Login
          </LoginButton>
        </form>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
