import React from "react";
import "./BuyerUpload.css";
import { Table } from "antd";

function BuyerUpload() {
  const dataBuyer = [
    // Define sample data for buyer
    {
      key: "TR001",
      date: "10/3/2024",
      userLogin: 9654784578,
      ticketDetails: "Pdf (2)",
      accountType: "IOB96A300029Q",
      amount: 400,
      convenienceFee: 20,
    },
    {
      key: "TR002",
      date: "10/3/2024",
      userLogin: 9654784578,
      ticketDetails: "Jpg (2)",
      accountType: "Upi@010gpay",
      amount: 450,
      convenienceFee: 20,
    },
    {
      key: "TR003",
      date: "10/3/2024",
      userLogin: 9654784578,
      ticketDetails: "PDF (2)",
      accountType: "IOB96A300029Q",
      amount: 400,
      convenienceFee: 10,
    },
  ];

  const dataUploader = [
    // Define sample data for uploader
    {
      key: "TR001",
      date: "10/3/2024",
      userLogin: 9654784578,
      ticketDetails: "Pdf (2)",
      accountType: "IOB96A300029Q",
      amount: 400,
      convenienceFee: 20,
    },
    {
      key: "TR002",
      date: "10/3/2024",
      userLogin: 9654784578,
      ticketDetails: "Jpg (2)",
      accountType: "Upi@010gpay",
      amount: 450,
      convenienceFee: 20,
    },
    {
      key: "TR003",
      date: "10/3/2024",
      userLogin: 9654784578,
      ticketDetails: "PDF (2)",
      accountType: "IOB96A300029Q",
      amount: 400,
      convenienceFee: 10,
    },
  ];

  // Buyer calculations
  const totalAmountSumBuyer = dataBuyer.reduce((acc, item) => acc + item.amount, 0);
  const totalConvenienceFeeSumBuyer = dataBuyer.reduce(
    (acc, item) => acc + item.convenienceFee,
    0
  );
  const totalSumBuyer = totalAmountSumBuyer + totalConvenienceFeeSumBuyer;

  const dataWithTotalRowBuyer = [
    ...dataBuyer,
    {
      key: "Total Amount",
      amount: totalAmountSumBuyer,
      convenienceFee: totalConvenienceFeeSumBuyer,
      total: totalSumBuyer,
    },
  ];

  // Uploader calculations
  const totalAmountSumUploader = dataUploader.reduce((acc, item) => acc + item.amount, 0);
  const totalConvenienceFeeSumUploader = dataUploader.reduce(
    (acc, item) => acc + item.convenienceFee,
    0
  );
  const totalSumUploader = totalAmountSumUploader - totalConvenienceFeeSumUploader;

  const dataWithTotalRowUploader = [
    ...dataUploader,
    {
      key: "Total Amount",
      amount: totalAmountSumUploader,
      convenienceFee: totalConvenienceFeeSumUploader,
      total: totalSumUploader,
    },
  ];

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
      key: "userLogin",
      dataIndex: "userLogin",
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
      render: (text) => <span style={{ color: "green" }}>₹{text}</span>,
    },
    {
      title: "Convenience fee",
      key: "convenienceFee",
      dataIndex: "convenienceFee",
      render: (text) => <span style={{ color: "green" }}>₹{text}</span>,
    },
    {
      title: "Total",
      key: "total",
      dataIndex: "total",
      render: (text, record) => (
        <span style={{ color: "green" }}>₹{record.key === "Total Amount" ? text : record.amount - record.convenienceFee}</span>
      ),
    },
  ];

  return (
    <>
      <div className="buyer-section">
        <h3 className="payment-title">Payment</h3>
        <h6 className="payment-title">Buyer Payment</h6>
        <Table columns={columns} dataSource={dataWithTotalRowBuyer} />
        <hr />
      </div>
      <div className="uploader-section">
        <h6 className="payment-title">Uploader Payment</h6>
        <Table columns={columns} dataSource={dataWithTotalRowUploader} />
      </div>
    </>
  );
}

export default BuyerUpload;
