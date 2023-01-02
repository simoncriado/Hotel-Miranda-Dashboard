// Context
import { useAuthContext } from "./useAuthContext";

// Sispatch logout action
export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    try {
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      console.log(err.message);
    }
  };

  return { logout };
};
