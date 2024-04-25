// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
// import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

const App: React.FC = () => {
  // const isAuthenticated = true; // Replace with your authentication logic

  return (
    <Router>
      <Routes>
        {/* <PrivateRoute
          path="/"
          element={<HomePage />}
          isAuthenticated={isAuthenticated}
        /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
