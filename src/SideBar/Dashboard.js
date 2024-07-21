import React, { useState, useEffect } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Layout, Menu, theme, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./Dashboard.css"; // Import the CSS file
//components
import HeaderComponent from "../Header/HeaderComponent";
import MainDashboard from "../MainDashboard/MainDashboard";
import Token from "../Token/Token";
import Payment from "../Payment";
import AddUser from "../AddUser/AddUser";
import PaymentTracking from "../PaymentTracking/PaymentTracking";
//icons
import DashboardMonitorIcon from "../Asset/DashBoard .png";
import AddUserIcon from "../Asset/user.png";
import TicketIcon from "../Asset/Ticket -773355.png";
import RupeeIcon from "../Asset/rupee.png";
import PaymentTrackingIcon from "../Asset/Payment Traking .png";
//firebase
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [collapsed, setCollapsed] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userPermissions, setUserPermissions] = useState([]);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const {
    token: { colorBgContainer },
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
          setUserPermissions(userData.permission || []);
          setUserRole(userData.role || "");
          setUserData(userData);
          localStorage.setItem("userData", JSON.stringify(userData));
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
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserPermissions(parsedUserData.permission || []);
      setUserRole(parsedUserData.role || "");
      setUserData(parsedUserData);
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is authenticated:", user);
        if (!storedUserData) {
          fetchUserData(user.uid);
        }
      } else {
        if (!isLoggingOut) {
          console.error("User is not authenticated");
          message.info("User is not authenticated");
          // navigate("/"); this for temperary if no user is exist it will exit to login screen
        }
      }
    });

    return () => unsubscribe();
  }, [isLoggingOut, navigate]);

  const handleMenuClick = ({ key }) => {
    if (key === "/dashboard/logout") {
      console.log("Performing logout action...");
      setIsLoggingOut(true);
      auth
        .signOut()
        .then(() => {
          setUserData(null);
          localStorage.removeItem("authToken");
          localStorage.removeItem("userData");
          navigate("/");
        })
        .catch((error) => {
          console.error("Error signing out:", error);
          message.error("Failed to sign out");
          setIsLoggingOut(false);
        });
      message.success("Logged out successfully");
    } else {
      navigate(key);
    }
  };

  const renderContent = () => {
    switch (id) {
      case "main":
        return <MainDashboard />;
      case "token":
        return <Token />;
      case "paymenttracking":
        return <PaymentTracking />;
      case "user":
        return <AddUser />;
      case "payment":
        return <Payment />;
      default:
        return <MainDashboard />;
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
            zIndex: 1,
            left: 0,
            top: 78,
            bottom: 0,
            borderRadius: "0px",
            background: colorBgContainer,
          }}
          className="collaps-slider"
          collapsible
          collapsed={collapsed}
          onCollapse={(collapsed) => setCollapsed(collapsed)}
        >
          <Menu
            onClick={handleMenuClick}
            mode="inline"
            defaultSelectedKeys={["/dashboard/main"]}
            selectedKeys={[`/dashboard/${id}`]}
          >
            {userPermissions.includes("MainDashboard") && (
              <Menu.Item
                key="/dashboard/main"
                icon={
                  <img
                    src={DashboardMonitorIcon}
                    width={16}
                    height={16}
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
                    width={16}
                    height={16}
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
                    width={16}
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
                    width={16}
                    height={16}
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
                    width={16}
                    height={16}
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
