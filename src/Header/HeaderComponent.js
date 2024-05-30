import React from "react";
import LogoImg from "../Asset/CG Logo.PNG";
import "./HeaderComponent.css";
import { BellOutlined, CaretDownFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import UserProfile from "../Asset/User-profile.jpg";
import { Dropdown, Menu, Badge } from "antd"; // Import Menu component from Ant Design

function HeaderComponent() {
  const menuItems = [
    // Define menu items
    {
      key: "1",
      // we can add either Anchor tag
      label: (
        <a target="_blank" rel="noopener noreferrer" href="">
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="">
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="">
          1st menu item
        </a>
      ),
    },
    {
      key: "4",
      label: "Logout",
    },
  ];

  const menu = // Create the menu with menu items
    (
      <Menu>
        {menuItems.map((item) => (
          <Menu.Item key={item.key}>{item.label}</Menu.Item>
        ))}
      </Menu>
    );

  // Sample count, later I will replace the count
  const notificationCount = 3;

  return (
    <div className="logo-container">
      <div className="logo-container-main">
        <img className="LogoImgs" src={LogoImg} alt="Cloud Garage logo" />

        <ul className="nav-links">
          <li>
            <Link to="/notification">
              <Badge
                count={notificationCount}
                style={{ backgroundColor: "dodgerblue" }}
              >
                <BellOutlined style={{ fontSize: "24px" }} />
              </Badge>
            </Link>
          </li>
          <li>
            <Link to="/profile" className="d-flex justify-content-between">
              <div>
                <img
                  src={UserProfile}
                  className="user-profile"
                  alt="profile-avator"
                />
              </div>
              <div className="admin-name ms-2 justify-content-between">
                <h6 className="">Name</h6>
                <p className="">Super Admin</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HeaderComponent;
