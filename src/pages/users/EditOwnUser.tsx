// React
import { useState } from "react";
import { useNavigate } from "react-router";

// React Context
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEditUser } from "../../hooks/useEditUser";

// Styled Components
import {
  LoginContainer,
  LoginCard,
  InputContainer,
  Input,
  LoginButton,
  Description,
} from "../../pages/login/LoginStyled";

// Component to update the user´s userName and email. Dispatching the editUser reducer
const SingleUser = () => {
  const { user } = useAuthContext();
  const { editUser } = useEditUser();
  const navigate = useNavigate();

  const [userName, setUserName] = useState(user.userName);
  const [email, setEmail] = useState(user.email);

  const validateEdit = () => {
    editUser(userName, email);
    localStorage.setItem(
      "auth",
      JSON.stringify({
        auth: true,
        userName: userName,
        email: email,
      })
    );
    navigate("/");
  };

  return (
    <LoginContainer style={{ minHeight: "80%" }}>
      <LoginCard>
        <Description>
          Here you can edit your User Name and/or E-mail
        </Description>
        <form>
          <InputContainer>
            <Input
              type="text"
              className="input-user"
              value={userName}
              placeholder={user.userName}
              onChange={(e) => setUserName(e.target.value)}
            ></Input>
          </InputContainer>
          <InputContainer>
            <Input
              type="text"
              className="input-user"
              value={email}
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
          </InputContainer>
          <LoginButton onClick={() => validateEdit()}>Save</LoginButton>
        </form>
      </LoginCard>
    </LoginContainer>
  );
};

export default SingleUser;
