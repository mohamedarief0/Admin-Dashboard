import React from "react";
import { Routes, Route } from "react-router-dom";
// import CombineForm from "./combineForm/CombineForm";
// import DashBoard from "./DashBoard/DashBoard";
import DashBoard from "./SideBar";
import PageNotFound from "./PageNotFound/PageNotFount";
import "bootstrap/dist/css/bootstrap.css";
import LoginForm from "./LoginFormCloudGarage/LoginForm";
import MailValidation from "./Fogot password/Mailvalidation/MailValidation";
import InputOtp from "./Fogot password/InputOtp";
import ResetPassword from "./Fogot password/Reset/Reset";
import BuyerUpload from "./Buyer-Upload";
import Token from "./Token/Token";
import AddUser from "./AddUser/AddUser";


// onclick redirect
export default function App() {
  return (
      <Routes>
        {/* Cloud garage ticket website */}
        <Route path="/" element={<LoginForm/>} />
        <Route path="/mailvalidation" element={<MailValidation/>}/>
        <Route path="/otp" element={<InputOtp/>}/>
        <Route path="/resetPassword" element={<ResetPassword/>}/>
        <Route path="/dashboard" element={<DashBoard/>} />
        {/* <Route path="/dashboard" element={<SideBar/>} /> */}
        <Route path="/user" element={<AddUser/>} />
        <Route path="/payment" element={<BuyerUpload/>} />
        <Route path="/token" element={<Token/>}/>
        
        {/* NORMAL - Cloud garage Logins */}
        {/* <Route path="/" element={<CombineForm />} /> */}


        {/* Page 404 Error  */}
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
  );
}
