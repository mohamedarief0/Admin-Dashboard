import React from "react";

const Successful = () => {
  return (
    <div className="container">
      <div className="innercontainer">
        <div className="logoContainer">
          <img className="LogoImg" src={LogoImg} alt="Cloud Garage logo" />
        </div>
        <div>
          <h4> 📩 Check your mail</h4>
          <p>Change password link is send to you email</p>
          {/* <p>Please Enter your Email below</p> */}
        </div>
      </div>
    </div>
  );
};

export default Successful;
