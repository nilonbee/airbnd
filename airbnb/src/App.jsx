import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import About from "./pages/login";
import Register from "./pages/register";
import axios from "axios";
import Context from "./context";
import Account from "./pages/account";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

import "./App.css";

function App() {
  console.log("hi");
  return (
    <Context>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/profile" element={<Account />} />
        <Route path="/login" element={<About />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Context>
  );
}

export default App;
