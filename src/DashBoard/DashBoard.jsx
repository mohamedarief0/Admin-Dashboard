import React from "react";
import "./DashBoard.css";
import HeaderComponent from "../Header/HeaderComponent";
import AddUser from "../AddUser/AddUser";
import SideBar from "../SideBar";
export default function DashBoard() {
  return (
    <div className="Bg-Container">
      <HeaderComponent />
      <div className="d-flex">
        <SideBar />
        <AddUser />
      </div>
    </div>
  );
}
