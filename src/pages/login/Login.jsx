import React, { useState } from "react";

const Login = () => {
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
    } else {
      alert("Email or password are not correct! Please try again...");
    }
  };

  return (
    <div>
      <form>
        <input
          type="text"
          value={email}
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="login" text="Login" onClick={validateLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
