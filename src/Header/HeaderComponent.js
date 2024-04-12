import React from "react";
import LogoImg from "../Asset/CG Logo.PNG";
import "./HeaderComponent.css";

function HeaderComponent() {
  return (
    <div className="logoContainer">
      <div className="logo-container-main">
        <img className="LogoImg" src={LogoImg} alt="Cloud Garage logo" />
        <h3>User-Profile</h3>
      </div>
    </div>
  );
}

export default HeaderComponent;
