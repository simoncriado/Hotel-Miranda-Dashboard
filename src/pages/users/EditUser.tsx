// React
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

// Redux
import { getUser, editUser } from "../../features/users/usersSlice";

// Components
import UserForm from "../../components/users/UserForm";
import { Loader } from "../../components/styled/Loader";

// TypeScript
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { UserInt } from "../../interfaces/UserInt";

type UsersType = {
  singleUser: UserInt | null | undefined;
};

const EditUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const { singleUser } = useAppSelector<UsersType>(
    (state) => state.usersReducer
  );

  const [currentUser, setCurrentUser] = useState<UserInt | any>(null);
  const formTitle: string =
    "Here you can edit the fields needed and save them to update the original user";

  useEffect(() => {
    dispatch(getUser(Number(id)));

    setCurrentUser(singleUser);
  }, [singleUser, dispatch, id]);

  const handleInput = (event: any): void => {
    const { name, value } = event.target;
    setCurrentUser((prevState: UserInt) => ({ ...prevState, [name]: value }));
  };

  const handleCancel = (e: Event): void => {
    e.preventDefault();
    setCurrentUser({});
    navigate("/users");
  };

  const handleSubmit = (): void => {
    dispatch(editUser(currentUser));
    setCurrentUser({});
    navigate("/users");
  };
  return !currentUser ? (
    <Loader />
  ) : (
    <UserForm
      formTitle={formTitle}
      currentUser={currentUser}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
    />
  );
};

export default EditUser;
