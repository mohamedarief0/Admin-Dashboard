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
} from "antd";
import "./AddUser.css";

function AddUser() {
  // Define state variables for form, file list, and user data
  const [form] = Form.useForm(); // Initialize form instance
  const [fileList, setFileList] = useState([]); // State for uploaded file list
  const [userData, setUserData] = useState([]); // State for user data array
  const [individualCheckboxes, setIndividualCheckboxes] = useState({
    MainDashboard: false,
    PaymentTracking: false,
    Payment: false,
    Token: false,
    Adduser: false,
  });
  // State for user setfiled values of checkbox
  const [selectAllCheckbox, setSelectAllCheckbox] = useState(false);

  // Custom function to normalize uploaded file data
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  // Define handleFormChange function
  const handleFormChange = (changedValues, allValues) => {
    setUserData(allValues); // Update user data state with all form values
  };

  const handleCancel = () => {
    // Clear file list, reset form fields, and clear user data state
    setFileList([]);
    form.resetFields();
    setUserData([]);
    setIndividualCheckboxes({
      MainDashboard: false,
      PaymentTracking: false,
      Payment: false,
      Token: false,
      Adduser: false,
    });
    // Uncheck the "Select All" checkbox
    setSelectAllCheckbox(false);
  };

  // Event handler for file upload change
  function handleChange(info) {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    setFileList(fileList);
  }

  // Event handler for saving user data
  const handleSave = () => {
    // Validate the form fields
    form
      .validateFields()
      .then((values) => {
        const userId = values.userId;

        // Extract checkbox values
        const permission = Object.keys(individualCheckboxes).filter(
          (key) => individualCheckboxes[key]
        );

        // merge checkbox values with other form values
        const userDataWithPermissions = {
          ...values,
          permission,
        };
        // If validation successful, add the form values to the user data array
        let newData;
        if (!Array.isArray(userData)) {
          newData = [userDataWithPermissions];
        } else {
          newData = [...userData, userDataWithPermissions];
        }
        setUserData(newData); // Update user data state
        console.log("User Data:", newData); // Log the user data to console
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo); // Log validation errors to console
      });
  };

  // Custom function to handle checkbox change
  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    // Update state of individual checkboxes based on "Select All" checkbox
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
    // Update state of "Select All" checkbox
    setSelectAllCheckbox(checked);
  };

  // Custom function to handle individual checkbox change
  const handleIndividualChange = (e) => {
    const { name, checked } = e.target;

    // Update state of individual checkbox
    setIndividualCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: checked,
    }));
  };

  // Table Data
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
      dataIndex: "phone",
      key: "phone",
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
          {/* <a>Edit {record.name}</a> */}
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

  const data = [
    {
      key: "001",
      date: "10/3/2024",
      name: "Ajith",
      email: "ajith@gmial.com",
      phone: 9654715781,
      role: "Super Admin",
      permission: "All",
      status: "Open",
    },
    {
      key: "002",
      date: "10/3/2024",
      name: "Vijay",
      email: "vijayjoseph@gmial.com",
      phone: 9657841084,
      role: "Super Admin",
      permission: "All",
      status: "Close",
    },
    {
      key: "003",
      date: "10/3/2024",
      name: "Simbu",
      email: "simbustr@gmial.com",
      phone: 99457812365,
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
          {/* Form component */}
          <Form
            form={form}
            name="horizontal_login"
            layout="vertical"
            className="grid-containers"
            onValuesChange={handleFormChange} // Event listener for form field change
          >
            <div className="grid-container">
              {/* Form fields for user data */}
              <Form.Item
                name="userId"
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

              {/* Checkbox For permission */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  // justifyContent: "space-between",
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
                  // justifyContent: "space-between",
                }}
                className="btn-span"
              >
                {/* Inside your Form component, updateing the JSX for individual
                checkboxes like this: */}
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

              {/* Buttons for cancel and save actions */}
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
                    onClick={handleCancel} // Event listener for cancel button click
                  >
                    Cancel
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    size="large"
                    style={{ width: 200 }}
                    type="primary"
                    onClick={handleSave} // Event listener for save button click
                  >
                    Save
                  </Button>
                </Form.Item>
              </div>
            </div>

            {/* Upload component for image upload */}
            <Form.Item
              label={<h6>Upload image</h6>}
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                action="/upload.do"
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange} // Event listener for file upload change
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
      <Table className="table-Adduser" columns={columns} dataSource={data} />
    </div>
  );
}

export default AddUser;
