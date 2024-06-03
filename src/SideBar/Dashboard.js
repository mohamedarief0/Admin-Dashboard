import React, { useState, useEffect } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Layout, Menu, theme, message } from "antd";
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
// firebase
import { auth, db } from "../firebase"; // Import Firebase authentication and Firestore
import { collection, query, where, getDocs } from "firebase/firestore";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("/dashboard/main"); // State to keep track of the selected menu item
  const [userRole, setUserRole] = useState(""); // State to store user's role
  const [userPermissions, setUserPermissions] = useState([]); // State to store user's permissions
  const [isLoggingOut, setIsLoggingOut] = useState(false); // State to track if user is logging out
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [userData, setUserData] = useState(null);

  // Function to fetch user role and permissions from Firestore
  const fetchUserData = async (uid) => {
    try {
      console.log("Fetching user data for UID:", uid);
      const q = query(collection(db, "Adminusers"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          console.log("User data found:", doc.data());
          const userData = doc.data();
          // setUserRole(userData.role);
          setUserPermissions(userData.permission || []);
          setUserData(userData);
        });
      } else {
        console.error("User data not found in Firestore for UID:", uid);
        message.error("User data not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      message.error("Failed to fetch user data");
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is authenticated:", user);
        // Fetch user data only if it hasn't been fetched before
        if (!userPermissions.length) {
          fetchUserData(user.uid);
        }
      } else {
        if (!isLoggingOut) {
          console.error("User is not authenticated");
          message.info("User is not authenticated");
          // Redirect to the login page or handle the unauthenticated state as needed
          // navigate("/login");
        }
      }
    });
    return () => unsubscribe();
  }, [userPermissions, isLoggingOut]); // Only re-run the effect if userPermissions or isLoggingOut change

  // Function to handle menu item click
  const handleMenuClick = ({ key }) => {
    if (key === "/dashboard/logout") {
      console.log("Performing logout action...");
      setIsLoggingOut(true);
      auth
        .signOut()
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error signing out:", error);
          message.error("Failed to sign out");
          setIsLoggingOut(false);
        });
      message.success("logout successfull");
    } else {
      setSelectedKey(key);
      navigate(key);
    }
  };

  // Render content based on selected menu item and user permissions
  const renderContent = () => {
    switch (selectedKey) {
      case "/dashboard/main":
        return <MainDashboard />;
      case "/dashboard/token":
        return <Token />;
      case "/dashboard/paymenttracking":
        return <PaymentTracking />;
      case "/dashboard/user":
        return <AddUser />;
      case "/dashboard/payment":
        return <BuyerUpload />;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{ padding: 0, marginBottom: 20, background: colorBgContainer }}
      >
        <HeaderComponent userData={userData} />
      </Header>
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            paddingTop: 15,
            height: "100vh",
            position: "fixed",
            zIndex: 100,
            left: 0,
            top: 78,
            bottom: 0,
            background: colorBgContainer,
          }}
          collapsible
          collapsed={collapsed}
          onCollapse={(collapsed) => setCollapsed(collapsed)}
        >
          <Menu
            onClick={handleMenuClick}
            mode="inline"
            defaultSelectedKeys={["/dashboard/main"]}
            selectedKeys={[selectedKey]}
            // style={{marginTop:"50%"}}
          >
            {userPermissions.includes("MainDashboard") && (
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
            )}
            {userPermissions.includes("Token") && (
              <Menu.Item
                key="/dashboard/token"
                icon={
                  <img
                    src={TicketIcon}
                    width={18}
                    height={18}
                    alt="ticketIcon"
                  />
                }
              >
                Token's
              </Menu.Item>
            )}
            {userPermissions.includes("PaymentTracking") && (
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
            )}

            {userPermissions.includes("Payment") && (
              <Menu.Item
                key="/dashboard/payment"
                icon={
                  <img
                    src={RupeeIcon}
                    width={18}
                    height={18}
                    alt="PaymentIcon"
                  />
                }
              >
                Payment
              </Menu.Item>
            )}
            {userPermissions.includes("Adduser") && (
              <Menu.Item
                key="/dashboard/user"
                icon={
                  <img
                    src={AddUserIcon}
                    width={18}
                    height={18}
                    alt="userIcon"
                  />
                }
              >
                User's
              </Menu.Item>
            )}
            <Menu.Item
              key="/dashboard/logout"
              icon={<LogoutOutlined />}
              danger
              style={{ marginTop: "30px" }}
            >
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
          <Content
            style={{
              padding: "10px 20px 40px",
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
