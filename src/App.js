import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./LoginFormCloudGarage/LoginForm";
import RegistrationForm from "./RegistrationFromCloudGarage/RegistrationFrom";

import Dashboard from "./SideBar/Dashboard";
import MailValidation from "./FogotPassword/Mailvalidation/MailValidation";
import InputOtp from "./FogotPassword/InputOtp/InputOtp";
import ResetPassword from "./FogotPassword/Reset/Reset";

import PageNotFound from "./PageNotFound/PageNotFount";

import "bootstrap/dist/css/bootstrap.css";
function App() {
  return (
    <Routes>
      {/* Routes for login and password reset */}
      <Route path="/" element={<LoginForm />} />
      <Route path="/registration" element={<RegistrationForm />} />
      <Route path="/mailvalidation" element={<MailValidation />} />
      <Route path="/otp" element={<InputOtp />} />
      <Route path="/resetPassword" element={<ResetPassword />} />

      {/* Route for Dashboard */}
      <Route path="/dashboard/:id" element={<Dashboard />}/>

      {/* Route for 404 Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
