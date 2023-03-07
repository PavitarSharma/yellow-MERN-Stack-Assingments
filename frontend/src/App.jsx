import React from "react";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/signup/SignUp";
import ProctedRoutes from "./utils/ProctedRoutes";
import EditContact from "./pages/EditContact";

const App = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProctedRoutes />}>
          <Route path="/" exact element={<Home />} />
          <Route path="/contact/:id" exact element={<EditContact />} />
        </Route>

        <Route path="/login" exact element={<Login />} />
        <Route path="/signUp" exact element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
