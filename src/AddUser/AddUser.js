import React, { useState } from "react";
import { PlusOutlined, EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  Space,
  Table,
  Checkbox,
  message,
} from "antd";
import "./AddUser.css";
import db from "../firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

function AddUser() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [userData, setUserData] = useState({
    key: "",
    name: "",
    email: "",
    password: "",
    phoneNo: "",
    role: "",
    permission: [],
  });
  const [individualCheckboxes, setIndividualCheckboxes] = useState({
    MainDashboard: false,
    PaymentTracking: false,
    Payment: false,
    Token: false,
    Adduser: false,
  });
  const [selectAllCheckbox, setSelectAllCheckbox] = useState(false);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const addUserToFirestore = async (userData) => {
    try {
      const docRef = await addDoc(collection(db, "Adminusers"), userData);
      console.log("User data added to Firestore with ID: ", docRef.id);
      message.success("User added successfully!");
    } catch (error) {
      console.error("Error adding user data to Firestore: ", error);
      message.error("Failed to add user. Please try again.");
    }
  };

  const handleFormChange = (changedValues, allValues) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      ...allValues,
    }));
  };

  const handleCancel = () => {
    setFileList([]);
    form.resetFields();
    setUserData({
      key: "",
      name: "",
      email: "",
      password: "",
      phoneNo: "",
      role: "",
      permission: [],
    });
    setIndividualCheckboxes({
      MainDashboard: false,
      PaymentTracking: false,
      Payment: false,
      Token: false,
      Adduser: false,
    });
    setSelectAllCheckbox(false);
  };

  function handleChange(info) {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    setFileList(fileList);
  }

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const email = values.email;
      const phoneNo = values.phoneNo;

      const userSnapshot = await getDocs(
        query(collection(db, "Adminusers"), where("email", "==", email))
      );

      const phoneNoSnapshot = await getDocs(
        query(collection(db, "Adminusers"), where("phoneNo", "==", phoneNo))
      );

      const emailExists = !userSnapshot.empty;
      const phoneNoExists = !phoneNoSnapshot.empty;

      if (emailExists && phoneNoExists) {
        message.warning(
          "A user with the same email and phone number already exists."
        );
        return;
      } else if (emailExists) {
        message.warning("A user with the same email already exists.");
        return;
      } else if (phoneNoExists) {
        message.warning("A user with the same phone number already exists.");
        return;
      }

      // Validation passes, continue with user insertion

      const permission = Object.keys(individualCheckboxes).filter(
        (key) => individualCheckboxes[key]
      );

      const currentDate = new Date();
      const day = currentDate.getDate();
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const month = monthNames[currentDate.getMonth()];
      const year = currentDate.getFullYear();

      const userDataWithPermissions = {
        ...values,
        key: userData.key || "", // Use existing key if available
        date: `${month}/${day}/${year}`,
        permission: permission,
        status: "Open", // Assuming status is initially "Open" for new users
      };

      await addUserToFirestore(userDataWithPermissions);

      setUserData((prevUserData) => ({
        ...prevUserData,
        ...userDataWithPermissions,
      }));

      // Reset form fields and checkboxes after successful insertion
      form.resetFields();
      setIndividualCheckboxes({
        MainDashboard: false,
        PaymentTracking: false,
        Payment: false,
        Token: false,
        Adduser: false,
      });
      setSelectAllCheckbox(false);
    } catch (error) {
      console.error("Error adding user:", error);
      message.error("Failed to add user. Please try again.");
    }
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;

    if (checked) {
      setIndividualCheckboxes({
        MainDashboard: true,
        PaymentTracking: true,
        Payment: true,
        Token: true,
        Adduser: true,
      });
    } else {
      setIndividualCheckboxes({
        MainDashboard: false,
        PaymentTracking: false,
        Payment: false,
        Token: false,
        Adduser: false,
      });
    }
    setSelectAllCheckbox(checked);
  };

  const handleIndividualChange = (e) => {
    const { name, checked } = e.target;

    if (individualCheckboxes[name] === checked) {
      return;
    }

    setIndividualCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: checked,
    }));

    const allChecked = Object.values({
      ...individualCheckboxes,
      [name]: checked,
    }).every((checkbox) => checkbox);

    setSelectAllCheckbox(allChecked);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone No",
      dataIndex: "phoneNo",
      key: "phoneNo",
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
    },
    {
      title: "Permission",
      key: "permission",
      dataIndex: "permission",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>
            <EditTwoTone />
          </a>
          <a>
            <DeleteTwoTone />
          </a>
        </Space>
      ),
    },
  ];

  // sample data
  const data = [
    {
      key: "001",
      date: "10/3/2024",
      name: "Ajith",
      email: "ajith@gmial.com",
      phoneNo: 9654715781,
      role: "Super Admin",
      permission: "All",
      status: "Open",
    },
    {
      key: "002",
      date: "10/3/2024",
      name: "Vijay",
      email: "vijayjoseph@gmial.com",
      phoneNo: 9657841084,
      role: "Super Admin",
      permission: "All",
      status: "Close",
    },
    {
      key: "003",
      date: "10/3/2024",
      name: "Simbu",
      email: "simbustr@gmial.com",
      phoneNo: 99457812365,
      role: "Admin",
      permission: "Token",
      status: "close",
    },
  ];

  return (
    <div>
      <div className="AddUser-section">
        <h3 className="payment-title">Add user</h3>
        <div className="AddUser-bg-color">
          <Form
            form={form}
            name="horizontal_login"
            layout="vertical"
            className="grid-containers"
            onValuesChange={handleFormChange}
          >
            <div className="grid-container">
              <Form.Item
                name="key"
                rules={[
                  { required: true, message: "Please input User ID!" },
                  {
                    validator: (_, value) => {
                      if (!value || value > 0) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("User ID must be a positive integer.")
                      );
                    },
                  },
                ]}
              >
                <Input prefix="" type="number" placeholder="User ID" />
              </Form.Item>

              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please input Name!" }]}
              >
                <Input prefix="" type="text" placeholder="Name" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input Email!" },
                  { type: "email", message: "Please input a valid Email!" },
                ]}
              >
                <Input prefix="" type="email" placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input Password!" },
                  {
                    pattern:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                    message:
                      "Password must be at least 8 characters long and include uppercase, lowercase, numeric, and special characters.",
                  },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item
                name="phoneNo"
                rules={[
                  { required: true, message: "Please input Phone No!" },
                  {
                    pattern: /^\d{10}$/,
                    message: "Please input a valid Phone No!",
                  },
                ]}
              >
                <Input prefix="" type="number" placeholder="Phone No" />
              </Form.Item>
              <Form.Item
                name="role"
                rules={[{ required: true, message: "Please select Role!" }]}
              >
                <Select placeholder="Role">
                  <Select.Option value="SuperAdmin">Super Admin</Select.Option>
                  <Select.Option value="Admin">Admin</Select.Option>
                </Select>
              </Form.Item>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                }}
                className="btn-span"
              >
                <h6 className="me-3">User Permission:</h6>
                <Checkbox
                  onChange={handleCheckboxChange}
                  checked={selectAllCheckbox}
                >
                  Select All
                </Checkbox>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                }}
                className="btn-span"
              >
                <Checkbox
                  name="MainDashboard"
                  checked={individualCheckboxes.MainDashboard}
                  onChange={handleIndividualChange}
                >
                  MainDashboard
                </Checkbox>
                <Checkbox
                  name="PaymentTracking"
                  checked={individualCheckboxes.PaymentTracking}
                  onChange={handleIndividualChange}
                >
                  PaymentTracking
                </Checkbox>
                <Checkbox
                  name="Payment"
                  checked={individualCheckboxes.Payment}
                  onChange={handleIndividualChange}
                >
                  Payment
                </Checkbox>
                <Checkbox
                  name="Token"
                  checked={individualCheckboxes.Token}
                  onChange={handleIndividualChange}
                >
                  Token
                </Checkbox>
                <Checkbox
                  name="Adduser"
                  checked={individualCheckboxes.Adduser}
                  onChange={handleIndividualChange}
                >
                  Adduser
                </Checkbox>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                className="btn-span"
              >
                <Form.Item>
                  <Button
                    size="large"
                    style={{ width: 200 }}
                    type="default"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    size="large"
                    style={{ width: 200 }}
                    type="primary"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </Form.Item>
              </div>
            </div>

            <Form.Item
              label={<h6>Upload image</h6>}
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                action="/upload.do"
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange}
                maxCount={1}
                style={{ width: 500, height: 500 }}
              >
                {fileList.length === 0 && (
                  <button
                    style={{ border: 0, background: "none" }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                )}
              </Upload>
            </Form.Item>
          </Form>
        </div>
        <hr></hr>
      </div>
      <Table
        className="table-Adduser"
        columns={columns}
        dataSource={data} // Pass userData as an array
      />
    </div>
  );
}

export default AddUser;
