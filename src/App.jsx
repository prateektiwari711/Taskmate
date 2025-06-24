import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import AddTask from "./components/AddTask";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<SignUp />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/addtask" element={<AddTask />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
