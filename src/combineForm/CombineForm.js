import React, { useState } from "react";
import "./CombineForm.css";
import Button from "../Button";
import InputField from "../InputField";
import { useNavigate } from "react-router-dom";

const CombineForm = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});


  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
  };

  // Navigation to dashboard
  const navigation = useNavigate();
  function navigationDashboard() {
    // navigation("/dashboard");
    const url = `/dashboard`
    window.location.href = url;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    // Validation logic
    const errors = {};
    const userNameRegex = /^[a-zA-Z\s]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/;

    if (!values.username) {
      errors.username = "Username is required!";
    } else if (!userNameRegex.test(values.username)) {
      errors.username = "No number should not be include in the filed";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This is not a valid email format! Ex: abc@gmail.com";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    } else if (!passwordRegex.test(values.password)) {
      errors.password =
        "Password must be at least 8 characters long and contain at least one number, one uppercase letter, and one lowercase letter";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirmation password is required";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  const toggleForm = () => {
    setShowLogin((prevShowLogin) => !prevShowLogin);
    setFormValues({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setFormErrors({});
  };

  return (
    <div className="container">
      {showLogin ? (
        <div className="col-4">
          <form className="" onSubmit={handleSubmit}>
            <h1>Login Form</h1>
            <div>
              <InputField
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
              <p className="errors">{formErrors.email}</p>

              <InputField
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
              <p className="errors">{formErrors.password}</p>

              <Button
                type="submit"
                label="login"
                btncolor=".primarycolor"
                onclick={navigationDashboard}
              />

              <div className="signup">
                New user?{" "}
                <a href="#" onClick={toggleForm}>
                  Signup
                </a>
              </div>
            </div>
          </form>
          <div className="toggle-container col-6">
            <div className="toggle">Join us</div>
          </div>
        </div>
      ) : (
        <div className="col-4">
          <form onSubmit={handleSubmit}>
            <h1>Registration Form</h1>
            <div>
              <InputField
                type="text"
                name="username"
                placeholder="Username"
                value={formValues.username}
                onChange={handleChange}
              />
              <p className="errors">{formErrors.username}</p>

              <InputField
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
              <p className="errors">{formErrors.email}</p>

              <InputField
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
              <p className="errors">{formErrors.password}</p>

              <InputField
                type="password"
                name="password"
                placeholder="Confrim Password"
                value={formValues.confirmPassword}
                onChange={handleChange}
              />
              <p className="errors">{formErrors.confirmPassword}</p>

              <Button label="Register" btncolor=".primarycolor" />

              <div className="signup">
                Already have an account?{" "}
                <a href="#" onClick={toggleForm}>
                  Login
                </a>
              </div>
            </div>
          </form>
          <div className="toggle-container col-md-6">
            <div className="toggle">
              Welcome to <br />
              Deveops
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CombineForm;
