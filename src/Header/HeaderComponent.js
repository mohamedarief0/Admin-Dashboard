import React, { useEffect, useState } from "react";
import LogoImg from "../Asset/CG Logo.PNG";
import "./HeaderComponent.css";
import { BellOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import UserProfile from "../Asset/User-profile.jpg";
import { Badge } from "antd";

function HeaderComponent({ userData, notificationCount, setNotificationCount }) {
  // // Sample count, later replace the count
  // const notificationCount = 3;
 // State to track if notification count should be displayed
 const [showNotification, setShowNotification] = useState(false);

 // Effect to toggle showNotification based on notification count
 useEffect(() => {
   setShowNotification(notificationCount > 0);
 }, [notificationCount])
  return (
    <div className="logo-container">
      <div className="logo-container-main">
        <img className="LogoImgs" src={LogoImg} alt="Cloud Garage logo" />

        <ul className="nav-links">
          <li>
            <Link to="/dashboard/paymenttracking">
              <Badge
                  count={showNotification ? notificationCount : 0}
                style={{ backgroundColor: "#02b9f5" }}
              >
                <BellOutlined style={{ fontSize: "24px" }} />
              </Badge>
            </Link>
          </li>
          <li>
            <div className="d-flex justify-content-between align-items-center">
              <img
                src={userData?.profilePhoto || UserProfile}
                className="user-profile"
                alt="profile-avator"
              />
              <div className="ms-3 justify-content-between align-items-center profile-details">
                <h6 className="mb-2">{userData?.name || "User name"}</h6>
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
