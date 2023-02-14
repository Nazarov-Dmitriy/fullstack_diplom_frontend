import "./App.less";
import Main from "./pages/Main/Main";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/headers/Header";
import React from "react";
import Register from "./pages/Register/Register";
import Page from "./pages/Page";
import Profile from "./pages/Profile/Profile";
import Users from "./pages/Users/Users";
import AddHotel from "./pages/AddHotel/AddHotel";
import Hotel from "./pages/Hotel/Hotel";
import HotelUpdate from "./pages/HotelUpdate/HotelUpdate";

function App() {
  return (
    <BrowserRouter>
    <Page>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/hotel" element={<Hotel/>} />
          <Route path="/users" element={<Users/>} />
          <Route path="/add_hotel/" element={<AddHotel/>} />
          <Route path="/hotel/update/:id" element={<HotelUpdate/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      </Page>
    </BrowserRouter>
  );
}

export default App;



