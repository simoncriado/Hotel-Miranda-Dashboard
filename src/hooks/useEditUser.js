// Context
import { useAuthContext } from "./useAuthContext";

export const useEditUser = () => {
  const { dispatch } = useAuthContext();

  // Dispatch edit user action
  const editUser = async (userName, email) => {
    try {
      dispatch({
        type: "EDIT_USER",
        payload: { userName: userName, email: email },
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return { editUser };
};
