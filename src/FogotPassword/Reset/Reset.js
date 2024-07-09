import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "firebase/auth";
import { auth } from "../../firebase"; // Ensure this points to your Firebase configuration

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      message.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      message.error("Password must be at least 6 characters");
      return;
    }

    try {
      const user = auth.currentUser;
      await updatePassword(user, password);
      message.success("Password reset successfully!");
      navigate("/");
    } catch (error) {
      message.error("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="innercontainer">
        <h4>Reset Password</h4>
        <Form
          name="reset_password"
          style={{ maxWidth: 440 }}
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your new password!" }]}
          >
            <Input.Password
              className="inputField"
              size="large"
              placeholder="New Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your new password!" },
            ]}
          >
            <Input.Password
              className="inputField"
              size="large"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </Form.Item>

          <Form.Item>
            <Button
              block
              size="large"
              type="button"
              className="btnColor"
              onClick={handleResetPassword}
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
