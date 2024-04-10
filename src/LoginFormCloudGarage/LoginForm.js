import React from "react";
import "./LoginForm.css";
import { Button, Form, Input, message } from "antd";
import LogoImg from "../Asset/CG Logo.PNG";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  const handleSubmitted = () => {
    navigate("/dashboard");
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/;

  const validatePassword = (_, value) => {
    if (!passwordRegex.test(value)) {
      return Promise.reject(new Error("Invalid password format"));
    }
    return Promise.resolve();
  };

  return (
    <div className="container">
      <div className="innercontainer">
        <div className="logoContainer">
          <img className="LogoImg" src={LogoImg} alt="Cloud Garage logo" />
        </div>
        <h4>Login</h4>
        <Form
          name="basic"
          style={{ maxWidth: 440 }}
          initialValues={{ remember: true }}
          onFinish={handleSubmitted}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your E-mail!",
              },
              {
                pattern: emailRegex,
                message: "Invalid email format",
              },
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

          <Form.Item
            name="password"
            rules={[
              {
                validator: validatePassword,
              }
            ]}
          >
            <Input.Password
              className="inputField"
              type="password"
              size="large"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item name="forgetpassword">
            <div className="forget-passowrd">
              <Link to="mailvalidation">Forgot password</Link>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              block
              size="large"
              type="submit"
              htmlType="submit"
              className="btnColor"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
