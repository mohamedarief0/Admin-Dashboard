import React, { useState, useEffect } from "react";
import "./Payment.css";
import { Table } from "antd";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Timestamp } from "firebase/firestore";

function Payment() {
  const [buyerData, setBuyerData] = useState([]);
  const [uploaderData, setUploderData] = useState([]);

  useEffect(() => {
    const fetchBuyerData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ticketBuyerDetails"));
        const data = querySnapshot.docs.map((ticketDoc) => {
          const ticketData = ticketDoc.data();
          const totalAmountBoth = ticketData.withoutTaxTotalAmountMovie || ticketData.withoutTaxAmountSports;
          const total = (ticketData.withoutTaxTotalAmountMovie || ticketData.withoutTaxAmountSports) + ticketData.platform;

          let formattedDate = "Invalid date";

          try {
            let currentDateTime = ticketData.currentDateTime;

            if (currentDateTime instanceof Timestamp) {
              currentDateTime = currentDateTime.toDate();
            } else {
              currentDateTime = new Date(currentDateTime);
            }

            
            if (!isNaN(currentDateTime)) {
              formattedDate = `${currentDateTime.getDate().toString().padStart(2, '0')}-${
                (currentDateTime.getMonth() + 1).toString().padStart(2, '0')
              }-${currentDateTime.getFullYear()}`;
            }
          } catch (error) {
            console.error("Invalid date format:", error);
          }


          return {
            key: ticketDoc.id,
            ...ticketData,
            currentDateTime: formattedDate,
            amount: totalAmountBoth,
            convenienceFee: ticketData.platform,
            ticketDetails: ticketData.movieName || ticketData.teamNames,
            ticketCount: ticketData.ticketCount || ticketData.sportsTicketCount,
            total,

          };
        });
        setBuyerData(data);
      } catch (error) {
        console.error("Error fetching buyer data:", error);
      }
    };

    fetchBuyerData();
  }, []);

  useEffect(() => {
    const fetchUploderData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "successPaymentUploader"));
        const data = querySnapshot.docs.map((ticketDoc) => {
          const ticketData = ticketDoc.data();
          const total = (ticketData.totalAmount) - ticketData.platform;

          let formattedDate = "Invalid date";

          try {
            let currentDateTime = ticketData.uploaderPayDate;

            if (currentDateTime instanceof Timestamp) {
              currentDateTime = currentDateTime.toDate();
            } else {
              currentDateTime = new Date(currentDateTime);
            }

            
            if (!isNaN(currentDateTime)) {
              formattedDate = `${currentDateTime.getDate().toString().padStart(2, '0')}-${
                (currentDateTime.getMonth() + 1).toString().padStart(2, '0')
              }-${currentDateTime.getFullYear()}`;
            }
          } catch (error) {
            console.error("Invalid date format:", error);
          }


          return {
            key: ticketDoc.id,
            ...ticketData,
            currentDateTime: formattedDate,
            uploderLogin:ticketData.uploaderLogin,
            amount: ticketData.totalAmount,
            convenienceFee: ticketData.platform,
            ticketDetails: ticketData.ticketDetails,
            ticketCount: ticketData.ticketCount || ticketData.sportsTicketCount,
            AccountType:ticketData.accountTypeUploder,
            ticketCount:ticketData.ticketCount,
            total,

          };
        });
        setUploderData(data);
      } catch (error) {
        console.error("Error fetching buyer data:", error);
      }
    };

    fetchUploderData();
  }, []);

  const buyerColumn = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Date",
      dataIndex: "currentDateTime",
      key: "currentDateTime",
    },
    {
      title: "User Login",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
    },
    {
      title: "Ticket Details",
      dataIndex: "ticketDetails",
      key: "ticketDetails",
      render: (text, record) => (
        record.key !== "Total Amount" ? (
          <>
            {record.ticketDetails} ({record.imageType} ({record.ticketCount}))
          </>
        ) : null
      ),
    },
    {
      title: "Account Type",
      key: "AccountType",
      dataIndex: "AccountType",
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
      render: (text) => <span style={{ color: "green" }}>₹{text}</span>,
    },
  ];
  
  // Calculate overall totals and format them to one decimal place
  const totalAmountSumBuyer = parseFloat(buyerData.reduce((acc, item) => acc + item.amount, 0).toFixed(2));
  const totalConvenienceFeeSumBuyer = parseFloat(buyerData.reduce((acc, item) => acc + item.convenienceFee, 0).toFixed(2));
  const totalSumBuyer = parseFloat(buyerData.reduce((acc, item) => acc + item.total, 0).toFixed(2));

  const dataWithTotalRowBuyer = [
    {
      key: "Total Amount",
      amount: totalAmountSumBuyer,
      convenienceFee: totalConvenienceFeeSumBuyer,
      total: totalSumBuyer,
    },
  ];
  
  const uploderColumn = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Date",
      dataIndex: "currentDateTime",
      key: "currentDateTime",
    },
    {
      title: "User Login",
      key: "uploderLogin",
      dataIndex: "uploderLogin",
    },
    {
      title: "Ticket Details",
      dataIndex: "ticketDetails",
      key: "ticketDetails",
      render: (text, record) => (
        record.key !== "Total Amount" ? (
          <>
            {record.ticketDetails} ({record.imageType} ({record.ticketCount}))
          </>
        ) : null
      ),
    },
    {
      title: "Account Type",
      key: "AccountType",
      dataIndex: "AccountType",
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
      render: (text) => <span style={{ color: "green" }}>₹{text}</span>,
    },
  ];

  // Calculate overall totals and format them to one decimal place
  const totalAmountSumUploder = parseFloat(uploaderData.reduce((acc, item) => acc + item.amount, 0).toFixed(2));
  const totalConvenienceFeeSumUploder = parseFloat(uploaderData.reduce((acc, item) => acc + item.convenienceFee, 0).toFixed(2));
  const totalSuBUploder = parseFloat(uploaderData.reduce((acc, item) => acc + item.total, 0).toFixed(2));
  console.log(totalSuBUploder);
  // console.log(totalConvenienceFeeSumUploder);

  const dataWithTotalRowUploader = [
    {
      key: "Total Amount",
      amount: totalAmountSumUploder,
      convenienceFee: totalConvenienceFeeSumUploder,
      total: totalSuBUploder,
    },
  ];
  

  return (
    <>
      <div className="buyer-section">
        <h3 className="payment-title">Payment</h3>
        <h6 className="payment-title">Buyer Payment</h6>
        <Table columns={buyerColumn} dataSource={[...buyerData, ...dataWithTotalRowBuyer]} />
        <hr />
      </div>
      <div className="uploader-section">
        <h6 className="payment-title">Uploader Payment</h6>
        <Table columns={uploderColumn} dataSource={[...uploaderData, ...dataWithTotalRowUploader]} />
      </div>
    </>
  );
}

export default Payment;
