// React
import React from "react";

// Styles
import { LogoStyled, LogoIcon, LogoLetter, LogoText } from "./LogoStyled";

// Logo section in sidebar
const Logo = () => {
  return (
    <LogoStyled>
      <LogoIcon>
        <LogoLetter>H</LogoLetter>
      </LogoIcon>
      <LogoText>
        <h3>travl</h3>
        <p>Hotel Miranda Admin Dashboard</p>
      </LogoText>
    </LogoStyled>
  );
};

export default Logo;
