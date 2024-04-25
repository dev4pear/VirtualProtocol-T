// src/pages/SignupPage.tsx

import React from "react";
import SignupForm from "../components/SignupForm";
import "../styles/SignupPage.css"; // Import CSS file for styling

const SignupPage: React.FC = () => {
  return (
    <div className="page signup-container">
      <h2>Sign Up</h2>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
