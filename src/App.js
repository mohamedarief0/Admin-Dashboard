import React from "react";
import { Routes, Route } from "react-router-dom";
// import CombineForm from "./combineForm/CombineForm";
import DashBoard from "./DashBoard/DashBoard";
import PageNotFound from "./PageNotFound/PageNotFount";
import "bootstrap/dist/css/bootstrap.css";
import LoginForm from "./LoginFormCloudGarage/LoginForm";
import MailValidation from "./Fogot password/Mailvalidation/MailValidation";
import InputOtp from "./Fogot password/InputOtp";
import ResetPassword from "./Fogot password/Reset/Reset";

// onclick redirect
export default function App() {
  return (
      <Routes>
        {/* Cloud garage Logins */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/mailvalidation" element={<MailValidation/>}/>
        <Route path="/otp" element={<InputOtp/>}/>
        <Route path="/resetPassword" element={<ResetPassword/>}/>
        
        {/* NORMAL - Cloud garage Logins */}
        {/* <Route path="/" element={<CombineForm />} /> */}
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
  );
}
