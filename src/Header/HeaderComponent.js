import React from "react";
import LogoImg from "../Asset/CG Logo.PNG";
import "./HeaderComponent.css";
import { BellOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import UserProfile from "../Asset/User-profile.jpg";
import { Badge } from "antd";

function HeaderComponent({ userData }) {
  // Sample count, later replace the count
  const notificationCount = 3;

  return (
    <div className="logo-container">
      <div className="logo-container-main">
        <img className="LogoImgs" src={LogoImg} alt="Cloud Garage logo" />

        <ul className="nav-links">
          <li>
            <Link to="/dashboard/paymenttracking">
              <Badge
                count={notificationCount}
                style={{ backgroundColor: "dodgerblue" }}
              >
                <BellOutlined style={{ fontSize: "24px" }} />
              </Badge>
            </Link>
          </li>
          <li>
            <div className="d-flex justify-content-between whole-profile-circle">
              <div className="circle-profile">
                <img
                  src={userData?.profilePhoto || UserProfile }
                  className="user-profile"
                  alt="profile-avator"
                />
              </div>
              <div className="admin-name ms-2 justify-content-between">
                <h6 className="">{userData?.name || "User name"}</h6>
                <p className="person-role">{userData?.role || "Role"}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HeaderComponent;
