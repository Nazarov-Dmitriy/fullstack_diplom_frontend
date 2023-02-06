import "./App.less";
import Main from "./pages/Main/Main";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/headers/Header";
import React from "react";
import Register from "./pages/Register/Register";
import Page from "./pages/Page";
import Profile from "./pages/Profile/Profile";
import Users from "./pages/Users/Users";

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
          <Route path="/users" element={<Users/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      </Page>
    </BrowserRouter>
  );
}

export default App;



