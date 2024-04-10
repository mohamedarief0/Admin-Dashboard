import React, { useState } from "react";
import { PlusOutlined, EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload, Space, Table } from "antd";
import "./AddUser.css";

function AddUser() {
  // Define state variables for form, file list, and user data
  const [form] = Form.useForm(); // Initialize form instance
  const [fileList, setFileList] = useState([]); // State for uploaded file list
  const [userData, setUserData] = useState([]); // State for user data array

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

  // Define handleCancel function
  const handleCancel = () => {
    // Clear file list, reset form fields, and clear user data state
    setFileList([]);
    form.resetFields();
    setUserData([]);
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
        // If validation successful, add the form values to the user data array
        let newData;
        if (!Array.isArray(userData)) {
          newData = [values];
        } else {
          newData = [...userData, values];
        }
        setUserData(newData); // Update user data state
        console.log("User Data:", newData); // Log the user data to console
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo); // Log validation errors to console
      });
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
      // render: (text) => <a>{text}</a>,
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
    },
    {
      key: "002",
      date: "10/3/2024",
      name: "Vijay",
      email: "vijayjoseph@gmial.com",
      phone: 9657841084,
      role: "Super Admin",
    },
    {
      key: "003",
      date: "10/3/2024",
      name: "Simbu",
      email: "simbustr@gmial.com",
      phone: 99457812365,
      role: "Admin",
    },
  ];

  return (
    <div>
      <div className="AddUser-section">
        <h4>Add User</h4>
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
              {/* Buttons for cancel and save actions */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                className="btn-grid"
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
      <Table className="table-Adduser" columns={columns} dataSource={data}/>
    </div>
  );
}

export default AddUser;