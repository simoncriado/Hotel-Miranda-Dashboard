// React router
import { Navigate, Outlet } from "react-router-dom";

interface auth {
  authIsReady: boolean;
}

// Checking if auth exists in authContext. If not redirect to /login. If yes it return the rest of the routes (see App.js)
export const ProtectRoute = (auth: auth) => {
  if (!auth.authIsReady) return <Navigate to="/login" replace />;
  return (
    <>
      <Outlet />
    </>
  );
};
