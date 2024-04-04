import React from "react";
import { useState, useEffect } from "react";
import "../SignupComponent/Signup.css";

const SignupForm = () => {
  const [formValues, setFormValues] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    const userNameRegex = /^[a-zA-Z\s]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/;

    if (!values.username) {
      errors.username = "Username is required!";
    } else if (!userNameRegex.test(values.username)) {
      errors.username = "No number should not be include in the filed";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This is not a valid email format!";
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

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Registration Form</h1>
          <div className="ui form">
            <div className="field">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formValues.username}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.username}</p>

            <div className="field">
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.email}</p>
            <div className="field">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.password}</p>
            <div className="field">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formValues.confirmPassword}
                onChange={handleChange}
              />
              {formErrors.confirmPassword && (
                <p className="error">{formErrors.confirmPassword}</p>
              )}
            </div>
            <button type="submit" className="fluid ui button blue">
              Submit
            </button>

            <div className="signup">
              Already have an account? <a href="">Login</a>
            </div>
            
          </div>
        </form>
        <div className="toggle-container">
          <div className="toggle">
            Welcome to Devops <br></br>essential
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
