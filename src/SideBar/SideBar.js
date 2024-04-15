import React, { useState } from "react";
import { LogoutOutlined, HomeOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
// Main all components or content
import HeaderComponent from "../Header/HeaderComponent"; // Import your HeaderComponent
import MainDashboard from "../MainDashboard/MainDashboard";
import Token from "../Token/Token";
import BuyerUpload from "../Buyer-Upload";
import AddUser from "../AddUser/AddUser";
//icons
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
        return <MainDashboard />;
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
    <Layout style={{ height: "100vh" }}>
      <HeaderComponent /> {/* HeaderComponent */}
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            paddingTop:15,
            height: "100vh",
            position: "fixed",
            zIndex:1001,
            left: 0,
            top: 64,
            bottom: 0,
            background: colorBgContainer,
            // borderRadius: borderRadiusLG,  // content background color
          }}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <Menu
            onClick={handleMenuClick}
            mode="inline"
            defaultSelectedKeys={["/dashboard"]}
            selectedKeys={[selectedKey]}
            style={{ height: "100%", borderRight: 0 }}
            items={[
              {
                key: "/dashboard",
                icon: (
                  <img
                    src={DashboardMonitorIcon}
                    width={18}
                    height={18}
                    alt="DashboardIcon"
                  />
                ), // Use the imported SVG icon
                label: "Main Dashboard",
              },
              {
                key: "/token",
                icon: (
                  <img
                    src={TicketIcon}
                    width={18}
                    height={18}
                    alt="ticketIcon"
                  />
                ), // Use the imported SVG icon
                label: "Token's",
              },
              {
                key: "/payment",
                icon: (
                  <img
                    src={RupeeIcon}
                    width={18}
                    height={18}
                    alt="PaymentIcon"
                  />
                ), // Use the imported SVG icon
                label: "Payment",
              },
              {
                key: "/user",
                icon: (
                  <img
                    src={AddUserIcon}
                    width={18}
                    height={18}
                    alt="userIcon"
                  />
                ), // Use the imported SVG icon
                label: "User's",
              },
              {
                key: "/logout",
                icon: <img src={""} alt="logoutIcon" />, // Use the imported SVG icon
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
              marginLeft:"206px",
              padding: 24,
              minHeight: 280,
              // background: colorBgContainer,
              // borderRadius: borderRadiusLG,
              overflow: "auto",
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
