import React, { useState } from "react";
import "../../LoginFormCloudGarage/LoginForm.css";
import { Button, Form, Input, message } from "antd";
import LogoImg from "../../Asset/CG Logo.PNG";
import { Link, useNavigate } from "react-router-dom";

function MailValidation() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleGetCode = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // Check if email field is not empty before navigating
    if (email.trim() !== "" && emailRegex.test(email)) {
      navigate("/otp");
    } else {
      // Show message or perform action if email field is empty
      message.error("Please enter your email first");
    }
  };

  return (
    <div className="container">
      <div className="innercontainer">
        <div className="logoContainer">
          <img className="LogoImg" src={LogoImg} alt="Cloud Garage logo" />
        </div>
        <div>
          <h4>Forget password?</h4>
          <p>Please Enter your Email below</p>
        </div>
        <Form
          name="basic"
          style={{ maxWidth: 440 }}
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              }
            ]}
          >
            <Input
              className="inputField"
              type="email"
              size="large"
              allowClear
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Item>

          <Form.Item>
            <Button
              block
              size="large"
              type="button"
              className="btnColor"
              onClick={handleGetCode}
            >
              Get code
            </Button>
          </Form.Item>

          <Form.Item>
            <div>
              <p>
                Already have an account?{" "}
                <Link to="/" style={{ fontSize: 14 }}>
                  Login
                </Link>
              </p>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default MailValidation;
