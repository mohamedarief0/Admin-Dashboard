import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./SideBar/Dashboard";
import PageNotFound from "./PageNotFound/PageNotFount";
import LoginForm from "./LoginFormCloudGarage/LoginForm";
import MailValidation from "./Fogot password/Mailvalidation/MailValidation";
import InputOtp from "./Fogot password/InputOtp/InputOtp";
import ResetPassword from "./Fogot password/Reset/Reset";
import "bootstrap/dist/css/bootstrap.css";
function App() {
  return (
    <Routes>
      {/* Routes for login and password reset */}
      <Route path="/" element={<LoginForm />} />
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
