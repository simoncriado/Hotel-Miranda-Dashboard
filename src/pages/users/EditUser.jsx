// React
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getUser, editUser } from "../../features/users/usersSlice";

// Components
import UserForm from "../../components/users/UserForm";
import { Loader } from "../../components/styled/Loader";

const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const { singleUser } = useSelector((state) => state.usersReducer);

  const [currentUser, setCurrentUser] = useState(null);
  const formTitle =
    "Here you can edit the fields needed and save them to update the original user";

  useEffect(() => {
    dispatch(getUser(Number(id)));

    setCurrentUser(singleUser);
  }, [singleUser, dispatch, id]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setCurrentUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setCurrentUser({});
    navigate("/users");
  };

  const handleSubmit = () => {
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
