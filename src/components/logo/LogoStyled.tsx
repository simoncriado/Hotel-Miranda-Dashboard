import styled from "styled-components";

const LogoStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
  margin-left: 15%;
`;

const LogoIcon = styled.div`
  overflow: hidden;
  width: 8rem;
  height: 8rem;
  box-shadow: 0px 14px 24px 0px rgba(139, 139, 139, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoLetter = styled.p`
  overflow: hidden;
  font-size: 3.5rem;
  font-weight: 700;
  font-family: var(--font-poppins);
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  h3 {
    margin: 0;
    font-size: 3rem;
    font-weight: 900;
    letter-spacing: 0.1rem;
  }
  p {
    margin: 0;
    font-size: 1.3rem;
    color: #4e4e4e;
  }
`;

export { LogoStyled, LogoIcon, LogoLetter, LogoText };
