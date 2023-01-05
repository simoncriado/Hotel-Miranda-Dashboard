// React & Router
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// React Context
import { useAuthContext } from "./hooks/useAuthContext";

// Pages
import Dashboard from "./pages/dashboard/Dashboard";
import Bookings from "./pages/bookings/Bookings";
import SingleBooking from "./pages/bookings/SingleBooking";
import EditBooking from "./pages/bookings/EditBooking";
import NewBooking from "./pages/bookings/NewBooking";
import Rooms from "./pages/rooms/Rooms";
import SingleRoom from "./pages/rooms/SingleRoom";
import NewRoom from "./pages/rooms/NewRoom";
import EditRoom from "./pages/rooms/EditRoom";
import Users from "./pages/users/Users";
import SingleUser from "./pages/users/SingleUser";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";

// Components
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Layout from "./components/Layout";
import { ProtectRoute } from "./components/ProtectedRoute";

// I allow routes based on the info in the context. Is any user logged in or not?
function App() {
  const { authIsReady } = useAuthContext();

  return (
    <BrowserRouter>
      <Layout>
        {authIsReady ? <Sidebar /> : <></>}

        {/* I need this div here as Layout is flex. Like this I can separate sideBar from the rest of the page */}
        <div className="window-container">
          {authIsReady ? <Topbar /> : <></>}
          <Routes>
            <Route
              path="/login"
              element={authIsReady ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/"
              element={
                authIsReady ? <Dashboard /> : <Navigate to="/login" replace />
              }
            />

            <Route
              path="*"
              element={<ProtectRoute authIsReady={authIsReady} />}
            >
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<SingleBooking />} />
              <Route path="editBooking/:bookingId" element={<EditBooking />} />
              <Route path="newBooking" element={<NewBooking />} />
              <Route path="rooms" element={<Rooms />} />
              <Route path="rooms/:roomId" element={<SingleRoom />} />
              <Route path="editRoom/:roomId" element={<EditRoom />} />
              <Route path="newRoom" element={<NewRoom />} />
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
