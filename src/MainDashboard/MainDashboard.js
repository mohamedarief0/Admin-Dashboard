import React, { useState } from "react";
import "./MainDashboard.css";
//icon
import AddUserIcon from "../Asset/group-icon.svg";
import { Form, DatePicker, Card, Col, Row } from "antd";
import LineChart from "../LineChart";

function MainDashboard() {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "This Week",
        data: [28, 29, 33, 36, 32, 32, 33],
      },
      {
        name: "Last week",
        data: [12, 11, 14, 18, 17, 13, 13],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 10,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#007BFE", "#05DFAD"],
      dataLabels: {
        // enabled: true, // showin number in the line
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Total income",
        align: "left",
      },
      grid: {
        // borderColor: " ", //this box chart box
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 2,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        title: {
          text: "Month",
        },
      },
      yaxis: {
        title: {
          // text: "Temperature",
        },
        min: 5,
        max: 40,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  });
  // totalIncomeDonut below the total icome card
  const [totalIncomeDonut, setTotalIncomeDonut] = useState({
    series: [44, 55],
    options: {
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 280,
            },
            legend: {
              position: "top",
            },
          },
        },
      ],
    },
  });

  // Overall Upload Ticket
  const [uploadTicket, setUploadTicket] = useState({
    series: [
      {
        name: "This Month",
        data: [28, 29, 33, 36, 32, 32, 33],
      },
      {
        name: "Last Month",
        data: [12, 11, 14, 18, 17, 13, 13],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 10,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#007BFE", "#05DFAD"],
      dataLabels: {
        // enabled: true, // showin number in the line
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Overall Upload Ticket",
        align: "left",
      },
      grid: {
        // borderColor: " ", //this box chart box
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 2,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        title: {
          text: "Month",
        },
      },
      yaxis: {
        title: {
          // text: "Temperature",
        },
        min: 0,
        max: 40,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  });
  // Overall Download Ticket
  const [downloadTicket, setDownloadTicket] = useState({
    series: [
      {
        name: "This Month",
        data: [28, 29, 33, 36, 32, 32, 33],
      },
      {
        name: "Last Month",
        data: [12, 23, 14, 30, 17, 33, 13],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 10,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#A804FF", "#3CD856"],
      dataLabels: {
        // enabled: true, // showin number in the line
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Overall Upload Ticket",
        align: "left",
      },
      grid: {
        // borderColor: " ", //this box chart box
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 2,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        title: {
          text: "Month",
        },
      },
      yaxis: {
        title: {
          // text: "Temperature",
        },
        min: 0,
        max: 40,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  });

  const config = {
    rules: [{ type: "object", required: true, message: "Please select date!" }],
  };
  return (
    <div>
      {/* Heading title  */}
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="">Main DashBoard</h3>
        <Form.Item name="date-picker" {...config}>
          <DatePicker size="large" />
        </Form.Item>
      </div>
      {/* Total income card chart */}
      {/* Total main grid div */}
      <div className="main-grid-container">
        <Card className="item item-1">
          <div className="d-flex justify-content-between">
            <h6>Today Activity </h6>
            <DatePicker />
          </div>
          <div className="">
            <LineChart data={chartData} type="line" />
          </div>
          <LineChart data={totalIncomeDonut} type="donut" />
        </Card>

        {/* Overall upload card chart */}
        <Card className="item item-2">
          <div className="d-flex justify-content-between">
            <h6>Today Activity</h6>
            <DatePicker />
          </div>
          <div className="d-flex align-items-center">
            <LineChart data={uploadTicket} type="area" />
          </div>
        </Card>

        {/* right side 2-Counter Uploder, downloader */}
        <div className="item item-3">
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
        </div>

        {/* Overall Download card chart */}
        <Card className="item item-4">
          <div className="d-flex justify-content-between">
            <h6>Today Activity</h6>
            <DatePicker />
          </div>
          <div className="d-flex align-items-center">
            <LineChart data={downloadTicket} type="line" />
          </div>
        </Card>
      </div>

      {/* Overall Details container  */}
      <div>
        <div className="d-flex justify-content-between mt-5 payment-title">
          <h3 className="">Overall details</h3>
          <DatePicker />
        </div>
        <Card className="d-flex">
          <LineChart data={totalIncomeDonut} type="donut" />
          {/* <LineChart data={totalIncomeDonut} type="donut" />
          <LineChart data={totalIncomeDonut} type="donut" /> */}
        </Card>
      </div>
    </div>
  );
}

export default MainDashboard;
