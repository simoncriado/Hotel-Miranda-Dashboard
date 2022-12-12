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

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setAuth(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={auth ? <Dashboard /> : <Navigate to="login" />}
        />
        <Route
          path="/bookings"
          element={auth ? <Bookings /> : <Navigate to="login" />}
        />
        <Route
          path="bookings/:bookingId"
          element={auth ? <SingleBooking /> : <Navigate to="login" />}
        />
        <Route
          path="/rooms"
          element={auth ? <Rooms /> : <Navigate to="login" />}
        />
        <Route
          path="rooms/:roomId"
          element={auth ? <SingleRoom /> : <Navigate to="login" />}
        />
        <Route
          path="/users"
          element={auth ? <Users /> : <Navigate to="login" />}
        />
        <Route
          path="users/:userId"
          element={auth ? <SingleUser /> : <Navigate to="login" />}
        />
        <Route
          path="/contact"
          element={auth ? <Contact /> : <Navigate to="login" />}
        />
        <Route path="/login" element={auth ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
