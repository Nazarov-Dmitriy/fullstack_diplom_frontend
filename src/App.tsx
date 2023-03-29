import "./App.less";
import Main from "./pages/Main/Main";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/headers/Header";
import React from "react";
import Register from "./pages/Register/Register";
import Page from "./pages/Page";
import Profile from "./pages/Profile/Profile";
import Users from "./pages/Users/Users";
import AddHotel from "./pages/HotelPages/AddHotel/AddHotel";
import AddHotelRoom from "./pages/HotelsRoomPages/AddHotelRoom/AddHotelRoom";
import HotelUpdate from "./pages/HotelPages/HotelUpdate/HotelUpdate";
import HotelRoomsSearchAdmin from "./pages/HotelsRoomPages/HotelRoomsSearchAdmin/HotelRoomsSearchAdmin";
import HoteRoomUpdate from "./pages/HotelsRoomPages/HoteRoomUpdate/HoteRoomUpdate";
import HotelRoomsSearch from "./pages/HotelsRoomPages/HotelRoomsSearch/HotelRoomsSearch";
import HotelRoom from "./pages/HotelsRoomPages/HotelRoom/HotelRoom";
import Hotels from "./pages/HotelPages/Hotels/Hotels";
import Hotel from "./pages/HotelPages/Hotel/Hotel";
import UserReservations from "./pages/Reservation/UserReservations/UserReservations";
import ClientReservations from "./pages/Reservation/ClientReservations/ClientReservations";
import ClientSupport from "./pages/Support/ClientSupport/ClientSupport";
import ManagerSupport from "./pages/Support/ManagerSupport/ManagerSupport";
import ChatSupport from "./pages/Support/ChatSupport/ChatSupport";
import { io } from "socket.io-client";

const socket = io(`${process.env.REACT_APP_URL_WEBSOKET}`);

function App() {
  return (
    <BrowserRouter>
      <Page>
        <Header />
        <div className="App">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<Users />} />
            <Route path="/hotel" element={<Hotels />} />
            <Route path="/hotel/:id" element={<Hotel />} />
            <Route path="/add-hotel" element={<AddHotel />} />
            <Route path="/hotel/update/:id" element={<HotelUpdate />} />
            <Route path="/hotel-rooms-search/" element={<HotelRoomsSearch />} />
            <Route path="/add-hotel-room/:id" element={<AddHotelRoom />} />
            <Route path="/hotel-room/:id" element={<HotelRoom />} />
            <Route path="/hotel-room/update/:id" element={<HoteRoomUpdate />} />
            <Route
              path="/hotel-rooms/search-admin/"
              element={<HotelRoomsSearchAdmin />}
            />
            <Route
              path="/сlient-reservations/"
              element={<ClientReservations />}
            />
            <Route path="/user-reservations/" element={<UserReservations />} />
            <Route path="/client-support/" element={<ClientSupport />} />
            <Route
              path="/manager-client-support/"
              element={<ManagerSupport />}
            />
            <Route
              path="/support-chat/:id"
              element={<ChatSupport socket={socket} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Page>
    </BrowserRouter>
  );
}

export default App;
