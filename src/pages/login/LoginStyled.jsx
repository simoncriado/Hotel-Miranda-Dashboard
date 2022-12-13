import styled from "styled-components";

const LoginContainer = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginCard = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 8px;
  box-shadow: 0px 16px 30px #00000014;
  padding: 3%;
  width: 50rem;
  height: 40rem;
`;

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Description = styled.p`
  text-align: center;
  font-family: var(--font-poppins);
  font-size: 1.4rem;
`;

const InputContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const Input = styled.input`
  transition: all 0.1s;
  width: 100%;
  margin: 30px 0;
  display: block;
  font-family: var(--font-poppins);
  font-size: 1.6rem;
  border: none;
  border-bottom: 1px solid #c5c5c5;

  &:hover {
    border-bottom: 1px solid #135846;
  }
  &:hover ~ div .input-icon {
    color: #135846;
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid #135846;
  }

  &:focus ~ div .input-icon {
    color: #135846;
  }
`;

const LoginButton = styled.div`
  background-color: #ebf1ef;
  border: none;
  border-radius: 8px;
  width: 16rem;
  transition: background-color 0.3s;
  text-align: center;
  font-family: var(--font-poppins);
  text-decoration: none;
  color: #135846;
  font-size: 1.4rem;
  font-weight: 600;
  display: block;
  padding: 1.5rem;
  margin: auto;
  :hover {
    background-color: rgba(19, 87, 69, 0.2);
  }
`;

export {
  LoginContainer,
  LoginCard,
  LogoContainer,
  InputContainer,
  Input,
  LoginButton,
  Description,
};
