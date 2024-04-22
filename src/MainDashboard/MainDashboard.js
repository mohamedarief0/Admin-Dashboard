import React, { useEffect, useState } from "react";
import "./MainDashboard.css";
//icon
import AddUserIcon from "../Asset/group-icon.svg";
import { Button, Form, DatePicker, Card, Checkbox } from "antd";
import LineChart from "../LineChart";

function MainDashboard() {
  const { RangePicker } = DatePicker;
  // Date picker
  const config = {
    rules: [{ type: "object", required: true, message: "Please select date!" }],
  };
  //check box
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const [totalIncome, setTotalIncome] = useState({
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
        text: "Total Income",
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
      // plotOptions: {
      //   pie: {
      //     donut: {
      //       labels: {
      //         show: true,
      //         name: "Total",
      //         value: 80,
      //       },
      //     },
      //   },
      // },
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
      labels: ["This week", "Last week"],
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

  // Overall Download Ticket line chart
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
        text: "Overall Download Ticket",
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

  // Overall Ticket details semi Circle gauge chart
  const [overallTicketDetails, setOverallTicketDetails] = useState({
    series: [76],
    options: {
      chart: {
        type: "radialBar",
        offsetY: -20,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "#e7e7e7",
            strokeWidth: "97%",
            margin: 5, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              color: "#999",
              opacity: 1,
              blur: 2,
            },
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              offsetY: -2,
              fontSize: "22px",
            },
          },
        },
      },
      grid: {
        padding: {
          top: -10,
        },
      },
      fill: {
        type: "line",
        gradient: {
          shade: "light",
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91],
        },
      },
      labels: ["Average Results"],
    },
  });

  // Overall details
  // 2nD Row Movie donut
  const [movie, setMovie] = useState({
    series: [20, 35, 5, 40],
    options: {
      chart: {
        type: "donut",
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              showAlways: true,
              name: {
                showAlways: true,
                // show: true,
                color: "#333",
                offsetY: 15,
                formatter: function (val) {
                  return "Movie";
                },
              },
              value: {
                showAlways: true,
                // show: true,
                color: "#333",
                offsetY: -15,
                formatter: function (val) {
                  return "100";
                },
              },
            },
          },
        },
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
      labels: ["Download", "Sold", "Upload", "Remaining"],
      colors: ["#1486FF", "#05DFAD", "#BFDEFF", "#0C0815"],
    },
  });
  
  // 2nD Row sports donut
  const [sports, setsports] = useState({
    series: [20, 35, 5, 40],
    options: {
      chart: {
        type: "donut",
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              showAlways: true,
              name: {
                showAlways: true,
                // show: true,
                color: "#333",
                offsetY: 15,
                formatter: function (val) {
                  return "sports";
                },
              },
              value: {
                showAlways: true,
                // show: true,
                color: "#333",
                offsetY: -15,
                formatter: function (val) {
                  return "100";
                },
              },
            },
          },
        },
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
      labels: ["Download", "sold", "upload", "Remaining"], // Set the labels for each series
      colors: ["#1486FF", "#05DFAD", "#BFDEFF", "#0C0815"],
    },
  });
  //State for range picker value
  const [rangeValue, setRangeValue] = useState([]);

  // Range picker change handler
  const onRangePickerChange = (value, dateString) => {
    console.log("Selected Range: ", dateString);
    setRangeValue(value);
  };

// demo purpose UseEffect and the content DEMO DEMO
// demo purpose UseEffect and the content DEMO DEMO
// demo purpose UseEffect and the content DEMO DEMO
  useEffect(() => {
    // Fetch data for the selected date range
    // Here, you need to fetch data from your backend or any other source
    // For demonstration purposes, I'm updating totalIncome with dummy data

    setTotalIncome({
      series: [
        {
          name: "This Week",
          data: [20, 25, 30, 35, 28, 30, 32], // Dummy data for the selected date range
        },
        {
          name: "Last week",
          data: [10, 15, 20, 25, 18, 20, 22], // Dummy data for the selected date range
        },
      ],
      options: {
        // Options for Total Income Line Chart options: {
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
          text: "Total Income",
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
  }, [rangeValue]);

  return (
    <>
      {/* Heading title  */}
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="payment-title">Main DashBoard</h3>
        <Form.Item name="date-picker" {...config}>
          <DatePicker size="large" />
        </Form.Item>
      </div>

      {/*1st row*/}
      {/* Total income card chart */}
      <div className="main-grid-container">
        <Card bordered className="item item-1">
          <div className="d-flex justify-content-between">
            <h6>Today Activity </h6>
            <RangePicker
              value={rangeValue}
              onChange={onRangePickerChange}
              style={{ width: 220, height: 28, fontSize: 12, padding: "16px" }}
            />
          </div>
          {/* Total main Line grid div */}
          <div className="mt-3">
            <LineChart
              data={totalIncome}
              type="line"
              width={380}
              height={250}
            />
          </div>
          <hr />
          <Checkbox onChange={onChange}>Yearly income</Checkbox>
          <hr />
          <LineChart data={totalIncomeDonut} type="donut" width={300} />
          <hr />
          <Checkbox onChange={onChange}>Transaction amount</Checkbox>
          <hr />
          <LineChart data={totalIncomeDonut} type="donut" width={250} />
        </Card>

        {/* Overall upload Area card chart */}
        <Card className="item item-2">
          <div className="d-flex justify-content-between">
            <h6>Today Activity</h6>
            <DatePicker />
          </div>
          <div className="mt-3">
            <LineChart
              data={uploadTicket}
              type="area"
              width={380}
              height={260}
            />
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

          <Card className="card-container-bg mt-2">
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
          <div className="d-flex align-items-center mt-3">
            <LineChart
              data={downloadTicket}
              type="line"
              width={380}
              height={280}
            />
          </div>
        </Card>

        {/* Overall Ticket details card chart */}
        <Card className="item item-5">
          <div className="d-flex justify-content-between">
            <h6>Overall Ticket Details</h6>
            <DatePicker />
          </div>
          <div className="mt-3">
            <p>This month</p>
            <LineChart
              data={overallTicketDetails}
              type="radialBar"
              width={360}
            />
          </div>
          <div className="d-flex align-items-center justify-content-between mt-5">
            <Button size="small" type="primary">
              Sold ticket
            </Button>
            <Button size="small" type="default">
              Remaining Ticket
            </Button>
            <Button size="small" type="default">
              Not sold Ticket
            </Button>
          </div>
        </Card>
      </div>

      {/*2nd row Details*/}
      {/* Overall Details container  */}
      <div>
        <div className="d-flex justify-content-between mt-5 payment-title">
          <h3 className="">Overall details</h3>
          <DatePicker />
        </div>
        <div className="overall-details">
          <LineChart data={movie} type="donut" width={320} />
          <LineChart data={sports} type="donut" width={320} />
          <LineChart data={totalIncomeDonut} type="donut" width={320} />
        </div>
      </div>
    </>
  );
}

export default MainDashboard;
