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
import PaymentTracking from "../PaymentTracking/PaymentTracking";
//icons
import DashboardMonitorIcon from "../Asset/dashboard-monitoring-icon.svg";
import AddUserIcon from "../Asset/group-icon.svg";
import TicketIcon from "../Asset/tickets-icon.svg";
import RupeeIcon from "../Asset/rupee-coin-solid-icon.svg";
import PaymentTrackingIcon from "../Asset/payment_tracking.svg";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("/dashboard/main"); // State to keep track of the selected menu item
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Function to handle menu item click
  const handleMenuClick = ({ key }) => {
    if (key === "/dashboard/logout") {
      console.log("Performing logout action...");
    } else {
      setSelectedKey(key);
      navigate(key); // Navigate to the clicked route
    }
  };
  

  // Render content based on selected menu item
  const renderContent = () => {
    switch (selectedKey) {
      case "/dashboard/main":
        return <MainDashboard />;
      case "/dashboard/token":
        return <Token />;
      case "/dashboard/payment":
        return <BuyerUpload />;
      case "/dashboard/user":
        return <AddUser />;
      case "/dashboard/paymenttracking":
        return <PaymentTracking />;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{ padding: 0, marginBottom: 20, background: colorBgContainer }}
      >
        <HeaderComponent /> {/* HeaderComponent */}
      </Header>
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            paddingTop: 15,
            height: "100vh",
            position: "fixed",
            zIndex: 1001,
            left: 0,
            top: 78,
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
            defaultSelectedKeys={["/dashboard/main"]}
            selectedKeys={[selectedKey]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item
              key="/dashboard/main"
              icon={
                <img
                  src={DashboardMonitorIcon}
                  width={18}
                  height={18}
                  alt="DashboardIcon"
                />
              }
            >
              Main Dashboard
            </Menu.Item>
            <Menu.Item
              key="/dashboard/token"
              icon={
                <img src={TicketIcon} width={18} height={18} alt="ticketIcon" />
              }
            >
              Token's
            </Menu.Item>
            <Menu.Item
              key="/dashboard/paymenttracking"
              icon={
                <img
                  src={PaymentTrackingIcon}
                  width={18}
                  height={18}
                  alt="PaymentIcon"
                />
              }
            >
              Payment tracking
            </Menu.Item>
            <Menu.Item
              key="/dashboard/payment"
              icon={
                <img src={RupeeIcon} width={18} height={18} alt="PaymentIcon" />
              }
            >
              Payment
            </Menu.Item>
            <Menu.Item
              key="/dashboard/user"
              icon={
                <img src={AddUserIcon} width={18} height={18} alt="userIcon" />
              }
            >
              User's
            </Menu.Item>
            <Menu.Item key="/dashboard/logout" icon={<LogoutOutlined />} danger>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content
            style={{
              marginLeft: "206px",
              padding: 24,
              minHeight: 280,
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

export default Dashboard;
