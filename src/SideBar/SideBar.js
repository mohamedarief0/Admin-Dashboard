import React, { useState } from "react";
import { LogoutOutlined, HomeOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import AddUser from "../AddUser/AddUser";
import BuyerUpload from "../Buyer-Upload";
import Token from "../Token/Token";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../Header/HeaderComponent"; // Import your HeaderComponent
import DashboardMonitorIcon from "../Asset/dashboard-monitoring-icon.svg";
import AddUserIcon from "../Asset/group-icon.svg";
import TicketIcon from "../Asset/tickets-icon.svg";
import RupeeIcon from "../Asset/rupee-coin-solid-icon.svg";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("/dashboard"); // State to keep track of the selected menu item
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigation = useNavigate(); // Use useNavigate hook to get the navigation function

  // Function to handle menu item click
  const handleMenuClick = ({ key }) => {
    if (key === "/logout") {
      // If logout is clicked, perform logout action
      // Here you can add your logout logic, such as clearing tokens, etc.
      console.log("Performing logout action...");
    } else {
      // Otherwise, navigate to the clicked key
      setSelectedKey(key);
    }
  };

  // Render content based on selected menu item
  const renderContent = () => {
    switch (selectedKey) {
      case "/dashboard":
        return <div>Main Dashboard Content</div>;
      case "/token":
        return <Token />;
      case "/payment":
        return <BuyerUpload />;
      case "/user":
        return <AddUser />;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderComponent /> {/* HeaderComponent */}
      <Layout>
        <Sider
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <Menu
            onClick={handleMenuClick}
            mode="inline"
            // defaultSelectedKeys={["/dashboard"]}
            selectedKeys={[selectedKey]}
            style={{ height: "100%", borderRight: 0 }}
            items={[
              {
                key: "/dashboard",
                icon: <img src={DashboardMonitorIcon} alt="Dashboard" />, // Use the imported SVG icon
                label: "Main Dashboard",
              },
              {
                key: "/token",
                icon: <img src={TicketIcon} alt="ticketicon" />, // Use the imported SVG icon
                label: "Token's",
              },
              {
                key: "/payment",
                icon: <img src={RupeeIcon} alt="Dashboard" />, // Use the imported SVG icon
                label: "Payment",
              },
              {
                key: "/user",
                icon: <img src={AddUserIcon} alt="userIcon" />, // Use the imported SVG icon
                label: "User's",
              },
              {
                key: "/logout",
                icon: <img src={""} alt="logout" />, // Use the imported SVG icon
                icon: <LogoutOutlined />,
                label: "Logout",
                danger: true,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: "auto", // Enable scrolling for the content
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
