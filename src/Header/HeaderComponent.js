import React from "react";
import LogoImg from "../Asset/CG Logo.PNG";
import "./HeaderComponent.css";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function HeaderComponent() {
  return (
    <div className="logoContainer">
      <div className="logo-container-main">
        <img className="LogoImg" src={LogoImg} alt="Cloud Garage logo" />
        <div>
          <a href="/notification" style={{width:24,}}><BellOutlined /></a>
          <Link to='/profile'><UserOutlined /></Link>
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;
