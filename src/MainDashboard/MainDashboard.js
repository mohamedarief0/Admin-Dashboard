import React from "react";
import "./MainDashboard.css";
//icon
import AddUserIcon from "../Asset/group-icon.svg";
import { Form, DatePicker, Card, Col, Row } from "antd";

function MainDashboard() {
  const config = {
    rules: [{ type: "object", required: true, message: "Please select date!" }],
  };
  return (
    <div>
        
      {/* right side Counter */}
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="payment-title">Main DashBoard</h3>
        <Form.Item name="date-picker" {...config}>
          <DatePicker size="large" />
        </Form.Item>
      </div>
      <h6 className="payment-title">Desc main</h6>
      <Col gap={16}>
        <Col span={8}>
          <Card className="card-container-bg">
            <div className="d-flex justify-content-between">
              <h6>Ticket uploder user </h6>
              <DatePicker />
            </div>
            <div className="d-flex align-items-center">
              <img
                src={AddUserIcon}
                width={30}
                height={30}
                className="Adduser-img"
                alt=""
              />
              <h2 className="ms-3">100</h2>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="card-container-bg mt-3">
            <div className="d-flex justify-content-between">
              <h6>Ticket downloader user </h6>
              <DatePicker />
            </div>
            <div className="d-flex align-items-center">
              <img
                src={AddUserIcon}
                width={30}
                height={30}
                className="Adduser-img"
                alt=""
              />
              <h2 className="ms-3">100</h2>
            </div>
          </Card>
        </Col>
      </Col>
    </div>
  );
}

export default MainDashboard;
