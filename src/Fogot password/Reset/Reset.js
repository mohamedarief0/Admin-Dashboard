import React, { useState } from "react";
import "../../LoginFormCloudGarage/LoginForm.css";
import { Button, Form, Input } from "antd";
import LogoImg from "../../Asset/CG Logo.PNG";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/;

  const validatePassword = (_, value) => {
    if (!passwordRegex.test(value)) {
      return Promise.reject(new Error("Invalid password format"));
    }
    return Promise.resolve();
  };

  const handleSubmit = () => {
    // Add your logic for handling the password reset here
    console.log("New Password:", password);
    console.log("Confirm Password:", confirmPassword);
  };

  return (
    <div className="container">
      <div className="innercontainer">
        <div className="logoContainer">
          <img className="LogoImg" src={LogoImg} alt="Cloud Garage logo" />
        </div>
        <Form
          name="reset-password"
          style={{ maxWidth: 440 }}
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <h4>Reset Password</h4>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please use special characters",
              },
              {
                validator: validatePassword,
              },
            ]}
          >
            <Input.Password
              className="inputField"
              size="large"
              placeholder="Enter new password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your new password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              className="inputField"
              size="large"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </Form.Item>

          <Form.Item>
            <Button
              block
              size="large"
              type="submit"
              className="btnColor"
              htmlType="submit"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
