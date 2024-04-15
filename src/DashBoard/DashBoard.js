import React from "react";
import "./DashBoard.css";
import HeaderComponent from "../Header/HeaderComponent";
import SliderComponent from "../SideBar/SideBar";
export default function DashBoard() {
  return (
    <div className="Bg-Container">
      {/* <HeaderComponent /> */}
      <div className="">
        <SliderComponent />
      </div>
    </div>
  );
}
