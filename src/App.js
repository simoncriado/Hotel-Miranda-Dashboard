import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Pages
import Dashboard from "./pages/dashboard/Dashboard";
import Bookings from "./pages/bookings/Bookings";
import SingleBooking from "./pages/bookings/SingleBooking";
import Rooms from "./pages/rooms/Rooms";
import SingleRoom from "./pages/rooms/SingleRoom";
import Users from "./pages/users/Users";
import SingleUser from "./pages/users/SingleUser";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";

// Components
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Layout from "./components/Layout";
import { ProtectRoute } from "./components/ProtectedRoute";

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setAuth(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        {auth ? <Sidebar /> : <></>}

        {/* I need this div here as Layout is flex. Like this I can separate sideBar from the rest of the page */}
        <div className="window-container">
          {auth ? <Topbar setAuth={setAuth} /> : <></>}
          <Routes>
            <Route
              path="/login"
              element={
                auth ? (
                  <Navigate to="/" />
                ) : (
                  <Login auth={auth} setAuth={setAuth} />
                )
              }
            />
            <Route
              path="/"
              element={auth ? <Dashboard /> : <Navigate to="/login" replace />}
            />

            <Route path="*" element={<ProtectRoute auth={auth} />}>
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<SingleBooking />} />
              <Route path="rooms" element={<Rooms />} />
              <Route path="rooms/:roomId" element={<SingleRoom />} />
              <Route path="users" element={<Users />} />
              <Route path="users/:userId" element={<SingleUser />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </div>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
