import React, { useState, useRef, useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import LogoImg from "../../Asset/CG Logo.PNG";
import { Link, useNavigate } from "react-router-dom";

function InputOtp() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [disable, setDisable] = useState(true);
  const [seconds, setSeconds] = useState(60);
  const [timerRunning, setTimerRunning] = useState(true); // New state to track timer status
  const inputsRef = [useRef(), useRef(), useRef(), useRef()];
  const navigate = useNavigate();

  useEffect(() => {
    const isFilled = otp.every((value) => value !== "");
    setDisable(!isFilled);
  }, [otp]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        setTimerRunning(false); // Stop the timer when seconds reach 0
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]); // Update the timer when seconds change

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      inputsRef[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputsRef[index - 1].current.focus();
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);
    // Add your logic to handle the entered OTP

    const expectedOtp = "1234"; // The expected OTP here
    if (enteredOtp === expectedOtp && enteredOtp !== "") {
      navigate("/resetpassword");
    } else {
      message.error("Invalid OTP");
    }
  };

  const handleResendOTP = () => {
    setSeconds(60); // Reset the timer
    setTimerRunning(true); // Start the timer
  };

  return (
    <div className="container">
      <div className="innercontainer">
        <div className="logoContainer">
          <img className="LogoImg" src={LogoImg} alt="Cloud Garage logo" />
        </div>
        <div>
          <h4>E-mail verification</h4>
          <p>We have sent a code to your email</p>
        </div>
        <Form
          name="basic"
          onSubmit={handleSubmit}
          style={{ maxWidth: 440 }}
          initialValues={{ remember: true }}
        >
          <Form.Item>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {otp.map((value, index) => (
                <Input
                  key={index}
                  ref={inputsRef[index]}
                  maxLength={1}
                  style={{ width: "50px", height: "50px" }}
                  value={value}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              disabled={disable}
              block
              size="large"
              type="submit"
              className={disable ? "btnDisabled" : "btnColor"}
              onClick={handleSubmit}
            >
              Verify Account
            </Button>
          </Form.Item>

          <Form.Item>
            <div>
              <p>
                Didn't receive code ?{" "}
                {timerRunning ? (
                  `Resend OTP in ${seconds} seconds`
                ) : (
                  <Link href=""style={{ fontSize: 14 }} onClick={handleResendOTP}>
                    Resend OTP
                  </Link>
                )}
              </p>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default InputOtp;
