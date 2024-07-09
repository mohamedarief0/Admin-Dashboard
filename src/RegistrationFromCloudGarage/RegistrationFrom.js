import React, { useState } from "react";
import { Button, Form, Input, message, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import LogoImg from "../Asset/CG Logo.PNG";
import "./RegistrationFrom.css";

function RegistrationForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const generateUniqueId = async (field) => {
    let isUnique = false;
    let newId;

    while (!isUnique) {
      newId = Math.floor(Math.random()*50)
      const q = query(collection(db, "Adminusers"), where(field, "==", newId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        isUnique = true;
      }
    }

    return newId;
  };

  const handleSubmitted = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const { email, password, role, name } = values;

      const userSnapshot = await getDocs(
        query(collection(db, "Adminusers"), where("email", "==", email))
      );
      if (!userSnapshot.empty) {
        message.warning("A user with the same email already exists.");
        setLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      let permission = [];
      if (role === "Super Admin") {
        permission = [
          "MainDashboard",
          "PaymentTracking",
          "Payment",
          "Token",
          "Adduser",
        ];
      } else if (role === "Admin") {
        permission = ["MainDashboard", "Token", "PaymentTracking"];
      }

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

      // Generate unique userId and key
      const userId = await generateUniqueId("userId");
      const key = await generateUniqueId("key");

      const userData = {
        email,
        name,
        role,
        uid: user.uid,
        status: "Open",
        date: `${month}/${day}/${year}`,
        permission,
        userId,
        key,
      };

      await addDoc(collection(db, "Adminusers"), userData);
      message.success("Registration successful! Please log in.");
      navigate("/");
    } catch (error) {
      console.error("Error during registration:", error);
      message.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/;

  const validatePassword = (_, value) => {
    if (!passwordRegex.test(value)) {
      return Promise.reject(
        new Error(
          "Password must be 8-25 characters long, contain uppercase and lowercase letters, a number, and a special character."
        )
      );
    }
    return Promise.resolve();
  };

  return (
    <div className="container">
      <div className="innercontainer">
        <div className="logoContainer">
          <img className="LogoImg" src={LogoImg} alt="Cloud Garage logo" />
        </div>
        <h5 className="mb-4">Registration Form</h5>
        <Form
          form={form}
          name="basic"
          style={{ maxWidth: 440 }}
          initialValues={{ remember: true }}
          onFinish={handleSubmitted}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input Name!" }]}
          >
            <Input
              className="inputField"
              type="text"
              size="large"
              allowClear
              placeholder="Name"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your E-mail!" },
              { pattern: emailRegex, message: "Invalid email format" },
            ]}
          >
            <Input
              className="inputField"
              type="email"
              size="large"
              allowClear
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item name="password" rules={[{ validator: validatePassword }]}>
            <Input.Password
              className="inputField"
              type="password"
              size="large"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="role"
            rules={[{ required: true, message: "Please select Role!" }]}
          >
            <Select className="inputField" placeholder="Role" size="large">
              <Select.Option value="Super Admin">Super Admin</Select.Option>
              <Select.Option value="Admin">Admin</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              block
              size="large"
              type="submit"
              htmlType="submit"
              className="btnColor mt-4"
              loading={loading}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default RegistrationForm;
