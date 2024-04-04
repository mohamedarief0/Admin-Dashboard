import { useState, useEffect } from "react";
import "../LoginComponent/Login.css";

function Login() {
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
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/;

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
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
    return errors;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui form">
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
          <button type="submit" className="fluid ui button blue">
            Submit
          </button>

          {/* <div className="signup">New user?<a href=""> signup</a></div> */}
        </div>
      </form>
      <div className="toggle-container">
        <div className="toggle">Join us</div>
      </div>
    </div>
  );
}

export default Login;




// function App() {
//   const [isLoginForm, setIsLoginForm] = useState(true);
//   const [loginFormValues, setLoginFormValues] = useState({
//     email: "",
//     password: ""
//   });
//   const [registrationFormValues, setRegistrationFormValues] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: ""
//   });
//   const [formErrors, setFormErrors] = useState({});

//   const handleToggleForm = () => {
//     setIsLoginForm(!isLoginForm);
//   };

//   const handleLoginChange = (e) => {
//     const { name, value } = e.target;
//     setLoginFormValues({ ...loginFormValues, [name]: value });
//   };

//   const handleRegistrationChange = (e) => {
//     const { name, value } = e.target;
//     setRegistrationFormValues({ ...registrationFormValues, [name]: value });
//   };

//   const handleLoginSubmit = (e) => {
//     e.preventDefault();
//     console.log("Login form submitted:", loginFormValues);
//     // Add your login logic here
//   };

//   const handleRegistrationSubmit = (e) => {
//     e.preventDefault();
//     console.log("Registration form submitted:", registrationFormValues);
//     // Add your registration logic here
//   };

//   const validateLoginForm = (values) => {
//     const errors = {};
//     if (!values.email) {
//       errors.email = "Email is required!";
//     }
//     if (!values.password) {
//       errors.password = "Password is required!";
//     }
//     return errors;
//   };

//   const validateRegistrationForm = (values) => {
//     const errors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
//     if (!values.username) {
//       errors.username = "Username is required!";
//     }
//     if (!values.email) {
//       errors.email = "Email is required!";
//     } else if (!emailRegex.test(values.email)) {
//       errors.email = "Invalid email format!";
//     }
//     if (!values.password) {
//       errors.password = "Password is required!";
//     }
//     if (!values.confirmPassword) {
//       errors.confirmPassword = "Please confirm password!";
//     } else if (values.confirmPassword !== values.password) {
//       errors.confirmPassword = "Passwords do not match!";
//     }
//     return errors;
//   };

//   return (
//     <div className="container">
//       <div className="form-container">
//         <button onClick={handleToggleForm}>
//           {isLoginForm ? "Sign Up" : "Login"}
//         </button>
//         {isLoginForm ? (
//           <div className="login-form">
//             <h1>Login Form</h1>
//             <form onSubmit={handleLoginSubmit}>
//               <div className="field">
//                 <input
//                   type="text"
//                   name="email"
//                   placeholder="Email"
//                   value={loginFormValues.email}
//                   onChange={handleLoginChange}
//                 />
//                 {formErrors.email && <p>{formErrors.email}</p>}
//               </div>
//               <div className="field">
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   value={loginFormValues.password}
//                   onChange={handleLoginChange}
//                 />
//                 {formErrors.password && <p>{formErrors.password}</p>}
//               </div>
//               <button type="submit" className="fluid ui button blue">
//                 Login
//               </button>
//             </form>
//           </div>
//         ) : (
//           <div className="registration-form">
//             <h1>Registration Form</h1>
//             <form onSubmit={handleRegistrationSubmit}>
//               <div className="field">
//                 <input
//                   type="text"
//                   name="username"
//                   placeholder="Username"
//                   value={registrationFormValues.username}
//                   onChange={handleRegistrationChange}
//                 />
//                 {formErrors.username && <p>{formErrors.username}</p>}
//               </div>
//               <div className="field">
//                 <input
//                   type="text"
//                   name="email"
//                   placeholder="Email"
//                   value={registrationFormValues.email}
//                   onChange={handleRegistrationChange}
//                 />
//                 {formErrors.email && <p>{formErrors.email}</p>}
//               </div>
//               <div className="field">
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   value={registrationFormValues.password}
//                   onChange={handleRegistrationChange}
//                 />
//                 {formErrors.password && <p>{formErrors.password}</p>}
//               </div>
//               <div className="field">
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   placeholder="Confirm Password"
//                   value={registrationFormValues.confirmPassword}
//                   onChange={handleRegistrationChange}
//                 />
//                 {formErrors.confirmPassword && (
//                   <p>{formErrors.confirmPassword}</p>
//                 )}
//               </div>
//               <button type="submit" className="fluid ui button green">
//                 Register
//               </button>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;