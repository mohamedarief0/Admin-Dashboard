import React from "react";
import HeaderComponent from "../Header/HeaderComponent";
import { Table } from "antd";
import "./Token.css";

function Token() {
  // buyer Token data
  const buyerColumns = [
    {
      title: "Token ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "User Login",
      dataIndex: "userLogin",
      key: "userLogin",
    },
    {
      title: "TicketFormat & (count)",
      dataIndex: "ticketDetails",
      key: "ticketDetails",
    },
    {
      title: "DW Platform",
      key: "dwplatform",
      dataIndex: "dwplatform",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (text) => <span style={{ color: "green" }}>{text}</span>,
    },
  ];

  const BuyerData = [
    // Define sample data
    {
      key: "TR001",
      date: "10/3/2024",
      userLogin: "00000 00000",
      ticketDetails: "Pdf (2)",
      dwplatform: "Thamizh0@gmail.com",
      status: "waiting..",
    },
    {
      key: "TR001",
      date: "10/3/2024",
      userLogin: "00000 00000",
      ticketDetails: "Caption Miller (Pdf (2))",
      dwplatform: "Thamizh0@gmail.com",
      status: "TK.jpg(2)",
    },
    {
      key: "TR001",
      date: "10/3/2024",
      userLogin: "00000 00000",
      ticketDetails: "Pdf (2)",
      dwplatform: "Thamizh0@gmail.com",
      status: "TK.jpg(2)",
    },
  ];

  // Uploder Token data
  const uploderColumns = [
    {
      title: "Token ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Token",
      dataIndex: "token",
      key: "token",
    },
    {
      title: "User Login",
      dataIndex: "userLogin",
      key: "userLogin",
    },
    {
      title: "Ticket Format",
      dataIndex: "ticketDetails",
      key: "ticketDetails",
    },
    {
      title: "Count (Total, Sale, Pending)",
      key: "count",
      dataIndex: "count",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (text) => {
        let color = "red"; // Default color for invalid formats or pending status
        if (text.includes("pdf") || text.includes("jpg")) {
          color = "green"; // Green color for valid formats
        }
        return <span style={{ color }}>{text}</span>;
      },
    },
  ];

  const uploderData = [
    // Define sample data
    {
      key: "TR001",
      date: "10/3/2024",
      token: "tr0ltasl",
      userLogin: "00000 00000",
      ticketDetails: "Captin Miller(tk.Pdf (2))",
      count: (
        <>
          <span
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "5px 10px",
            }}
          >
            3
          </span>
          <span
            style={{
              backgroundColor: "orange",
              color: "white",
              padding: "5px 10px",
            }}
          >
            0
          </span>
          <span
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "5px 10px",
            }}
          >
            3
          </span>
        </>
      ),
      status: "tk.format",
    },
    {
      key: "TR001",
      date: "10/3/2024",
      token: "tr0ltasl",
      userLogin: "00000 00000",
      ticketDetails: "Captin Miller(tk.Pdf (2))",
      count: (
        <>
          <span
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "5px 10px",
            }}
          >
            3
          </span>
          <span
            style={{
              backgroundColor: "orange",
              color: "white",
              padding: "5px 10px",
            }}
          >
            2
          </span>
          <span
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "5px 10px",
            }}
          >
            1
          </span>
        </>
      ),
      status: "tk.jpg(3)",
    },
    {
      key: "TR001",
      date: "10/3/2024",
      token: "tr0ltasl",
      userLogin: "00000 00000",
      ticketDetails: "Captin Miller(tk.Pdf (2))",
      count: (
        <>
          <span
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "5px 10px",
            }}
          >
            3
          </span>
          <span
            style={{
              backgroundColor: "orange",
              color: "white",
              padding: "5px 10px",
            }}
          >
            3
          </span>
          <span
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "5px 10px",
            }}
          >
            0
          </span>
        </>
      ),
      status: "tk.jpg(3)",
    },
  ];

  return (
    <div>
      {/* <HeaderComponent /> */}
      <div className="buyer-section">
        <h3 className="payment-title">Token</h3>
        <h6 className="payment-title">Buyer Token's</h6>
        <Table columns={buyerColumns} dataSource={BuyerData} />
        <hr></hr>
      </div>
      <div className="uploder-section">
        <h6 className="payment-title">Uploader Token's</h6>
        <Table columns={uploderColumns} dataSource={uploderData} />
      </div>
    </div>
  );
}

export default Token;
