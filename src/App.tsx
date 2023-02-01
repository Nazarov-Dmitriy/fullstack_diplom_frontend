import "./App.less";
import Main from "./pages/Main/Main";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/headers/Header";
import React, { SyntheticEvent } from "react";
import Register from "./pages/Register/Register";
import Page from "./pages/Page";

function App() {
  return (
    <BrowserRouter>
    <Page>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<Register/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      </Page>
    </BrowserRouter>
  );
}

export default App;



