// src/pages/LoginPage.tsx

import React from "react";
import LoginForm from "../components/LoginForm";
import "../styles/SignupPage.css"; // Import CSS file for styling

const LoginPage: React.FC = () => {
  return (
    <div className="page signup-container">
      <h2>Login</h2>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
