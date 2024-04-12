import React from "react";
import "./BuyerUpload.css";
import HeaderComponent from "../Header/HeaderComponent";
import { Table } from "antd";

function BuyerUpload() {
  const columns = [
    {
      title: "ID",
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
      title: "Ticket Details",
      dataIndex: "ticketDetails",
      key: "ticketDetails",
    },
    {
      title: "Account Type",
      key: "accountType",
      dataIndex: "accountType",
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount",
      render: (text, record) => <span style={{ color: "green" }}>₹{text}</span>,
    },
    {
      title: "Convenience fee",
      key: "convenienceFee",
      dataIndex: "convenienceFee",
      render: (text, record) => <span style={{ color: "green" }}>₹{text}</span>,
    },
    {
      title: "Total",
      key: "total",
      dataIndex: "total",
      render: (text, record) =>
        record.key === "Total" ? (
          <span style={{ color: "green" }}>₹{text}</span>
        ) : (
          <span style={{ color: "green" }}>
            ₹{record.amount + record.convenienceFee}
          </span>
        ),
    },
  ];

  const data = [
    // Define sample data
    {
      key: "TR001",
      date: "10/3/2024",
      userLogin: "Dhanush",
      ticketDetails: "Pdf (2)",
      accountType: "IOB96A300029Q",
      amount: 400,
      convenienceFee: 20,
      total: 470,
    },
    {
      key: "TR002",
      date: "10/3/2024",
      userLogin: "Suriya",
      ticketDetails: "Jpg (2)",
      accountType: "Upi@010gpay",
      amount: 450,
      convenienceFee: 20,
      total: 470,
    },
    {
      key: "TR003",
      date: "10/3/2024",
      userLogin: "Karthi",
      ticketDetails: "PDF (2)",
      accountType: "IOB96A300029Q",
      amount: 400,
      convenienceFee: 10,
      total: 475,
    },
  ];

  const totalAmountSum = data.reduce((acc, item) => acc + item.amount, 0);
  const totalConvenienceFeeSum = data.reduce((acc, item) => acc + item.convenienceFee,0);
  const totalSum = totalAmountSum + totalConvenienceFeeSum; // Calculate the total sum of Amount and Convenience fee

  const dataWithTotalRow = [
    ...data,
    {
      key: "Total Amount",
      amount: totalAmountSum,
      convenienceFee: totalConvenienceFeeSum,
      total: totalSum,
    },
  ];

  return (
    <div>
      <HeaderComponent />
      <div className="buyer-section">
        <h6 className="payment-title">Buyer Payment</h6>
        <Table columns={columns} dataSource={dataWithTotalRow} />
        <hr></hr>
      </div>
      <div className="uploder-section">
        <h6 className="payment-title">Uploader Payment</h6>
        <Table columns={columns} dataSource={dataWithTotalRow} />
      </div>
    </div>
  );
}

export default BuyerUpload;
