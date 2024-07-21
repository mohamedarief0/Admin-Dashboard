import React, { useEffect, useState } from "react";
import { Table, Tooltip } from "antd";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Timestamp } from "firebase/firestore";
import "./Token.css";

function Token() {
  const [uploaderData, setUploaderData] = useState([]);
  const [buyerData, setBuyerData] = useState([]);
  const [updatedUploaderData, setUpdatedUploaderData] = useState([]);

  const formatTimestamp = (timestamp) => {
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate().toLocaleString();
    }
    if (
      timestamp &&
      typeof timestamp === "object" &&
      "seconds" in timestamp &&
      "nanoseconds" in timestamp
    ) {
      return new Date(
        timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
      ).toLocaleString();
    }
    return "Invalid date";
  };

  useEffect(() => {
    const fetchBuyerData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "ticketBuyerDetails")
        );
        const data = querySnapshot.docs.map((doc) => {
          const docData = doc.data();
          const dwplatform = docData.email || docData.WhatsappNumber;
          const token = docData.ticketToken || docData.sportsTicketToken;
          const ticketDetails = docData.movieName || docData.teamNames;
          const programTime = formatTimestamp(
            docData.showTime || docData.matchTime
          );

          let formattedDate = "Invalid date";
          try {
            let currentDateTime = docData.currentDateTime;

            if (currentDateTime instanceof Timestamp) {
              currentDateTime = currentDateTime.toDate();
            } else {
              currentDateTime = new Date(currentDateTime);
            }

            if (!isNaN(currentDateTime)) {
              formattedDate = `${currentDateTime
                .getDate()
                .toString()
                .padStart(2, "0")}-${(currentDateTime.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${currentDateTime.getFullYear()}`;
            }
          } catch (error) {
            console.error("Invalid date format:", error);
          }

          return {
            key: doc.id,
            ...docData,
            currentDateTime: formattedDate,
            dwplatform,
            token,
            ticketDetails,
            programTime,
          };
        });
        setBuyerData(data);
      } catch (error) {
        console.error("Error fetching buyer data:", error);
      }
    };

    const fetchUploaderData = async () => {
      try {
        const ticketDetailsSnapshot = await getDocs(
          collection(db, "TicketDetails")
        );
        const sportTicketDetailsSnapshot = await getDocs(
          collection(db, "sportsTicketDetails")
        );

        const ticketDetails = ticketDetailsSnapshot.docs.map((ticketDoc) => {
          const docData = ticketDoc.data();
          const token = docData.ticketToken || docData.overAlltoken;
          const ticketDetails = docData.movieName || docData.teamNames;
          const programTime = formatTimestamp(
            docData.showTime || docData.matchTime
          );

          let formattedDate = "Invalid date";
          try {
            let currentDateTime = docData.currentDateTime;

            if (currentDateTime instanceof Timestamp) {
              currentDateTime = currentDateTime.toDate();
            } else {
              currentDateTime = new Date(currentDateTime);
            }

            if (!isNaN(currentDateTime)) {
              formattedDate = `${currentDateTime
                .getDate()
                .toString()
                .padStart(2, "0")}-${(currentDateTime.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${currentDateTime.getFullYear()}`;
            }
          } catch (error) {
            console.error("Invalid date format:", error);
          }

          const totalTickets = parseInt(docData.totalTicketCount) || 0;
          const balanceTickets = parseInt(docData.ticketCount) || 0;
          const soldTickets = totalTickets - balanceTickets;

          return {
            key: ticketDoc.id,
            ...docData,
            currentDateTime: formattedDate,
            totalTickets,
            soldTickets,
            balanceTickets,
            token,
            ticketDetails,
            programTime,
            type: "movie",
          };
        });

        const sportTicketDetails = sportTicketDetailsSnapshot.docs.map(
          (ticketDoc) => {
            const docData = ticketDoc.data();
            const programTime = formatTimestamp(
              docData.showTime || docData.matchTime
            );

            let formattedDate = "Invalid date";
            try {
              let currentDateTime = docData.currentDateTime;

              if (currentDateTime instanceof Timestamp) {
                currentDateTime = currentDateTime.toDate();
              } else {
                currentDateTime = new Date(currentDateTime);
              }

              if (!isNaN(currentDateTime)) {
                formattedDate = `${currentDateTime
                  .getDate()
                  .toString()
                  .padStart(2, "0")}-${(currentDateTime.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}-${currentDateTime.getFullYear()}`;
              }
            } catch (error) {
              console.error("Invalid date format:", error);
            }

            const totalTickets =
              parseInt(docData.totalSportsTicketCount, 10) || 0;
            const balanceTickets = parseInt(docData.sportsTicketCount, 10) || 0;
            const soldTickets = totalTickets - balanceTickets;

            return {
              key: ticketDoc.id,
              ...docData,
              currentDateTime: formattedDate,
              totalTickets,
              soldTickets,
              balanceTickets,
              token: docData.overAlltoken,
              ticketDetails: docData.teamNames,
              programTime,
              type: "sport",
            };
          }
        );

        setUploaderData([...ticketDetails, ...sportTicketDetails]);
      } catch (error) {
        console.error("Error fetching uploader data:", error);
      }
    };

    fetchBuyerData();
    fetchUploaderData();
  }, []);

  useEffect(() => {
    if (uploaderData.length > 0 && buyerData.length > 0) {
      const updatedData = uploaderData.map((uploader) => {
        const totalTickets =
          uploader.type === "movie"
            ? parseInt(uploader.totalTicketCount, 10) || 0
            : parseInt(uploader.totalSPortsTicketCount, 10) || 0;
        // const buyerCountForToken = buyerData
        //   .filter((buyer) => buyer.ticketToken === uploader.token)
        //   .reduce(
        //     (sum, buyer) => sum + (parseInt(buyer.ticketCount, 10) || 0),
        //     0
        //   );

        const soldTickets =
          totalTickets -
          (uploader.ticketCount || uploader.sportsTicketCount || 0);
        const pendingTickets = totalTickets - soldTickets;

        return {
          ...uploader,
          totalTickets,
          soldTickets,
          pendingTickets,
        };
      });

      setUpdatedUploaderData(updatedData);
    }
  }, [uploaderData, buyerData]);

  const buyerColumns = [
    {
      title: "User ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Date",
      dataIndex: "currentDateTime",
      key: "currentDateTime",
    },
    {
      title: "Token",
      dataIndex: "token",
      key: "token",
      render: (text, record) => <>{record.token}</>,
    },
    {
      title: "User Login",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Ticket Details",
      key: "ticketDetails",
      response: ["lg","md","sm"],
      render: (text, record) => (
        <>
          {record.movieName || record.teamNames} ({record.imageType} (
          {record.ticketCount || record.sportsTicketCount}) {record.programTime}
          )
        </>
      ),
    },
    {
      title: "DW Platform",
      key: "dwplatform",
      dataIndex: "dwplatform",
      response: ["lg","md","sm"],
    },
    {
      title: "Status",
      key: "imageType",
      dataIndex: "imageType",
      render: (text, record) => {
        const format = text;
        if (format === "pdf" || format === "image/jpeg") {
          return (
            <span style={{ color: "green" }}>
              {"jpeg"}({record.ticketCount ||record.sportsTicketCount})
            </span>
          );
        } else {
          return <span style={{ color: "red" }}>{text}</span>;
        }
      },
    },
  ];

  const uploaderColumns = [
    {
      title: "User ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Date",
      dataIndex: "currentDateTime",
      key: "currentDateTime",
    },
    {
      title: "Token",
      dataIndex: "token",
      key: "token",
      render: (text, record) => (
        <span> {record.overAlltoken && record.overAlltoken.join(", ")}</span>
      ),
    },
    {
      title: "User Login",
      dataIndex: "userPhoneNumber", // Assuming this is correct for movie tickets
      key: "userPhoneNumber",
    },
    {
      title: "Ticket Details",
      key: "ticketdetails",
      response: ["lg","md","sm"],
      render: (text, record) => (
        <>
          {record.type === "movie" ? record.movieName : record.teamNames} (
          {record.imageType} ({record.totalTickets}) {record.programTime})
        </>
      ),
    },
    {
      title: "Count (Total, Sold, Pending)",
      key: "count",
      align: "center",
      render: (text, record) => (
        <div style={{ borderRadius: "5px", width: "100%" }}>
          <span
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "5px 15px",
              width: "20%",
            }}
          >
            {record.totalTickets}
          </span>
          <span
            style={{
              backgroundColor: "orange",
              color: "white",
              padding: "5px 15px",
            }}
          >
            {record.soldTickets}
          </span>
          <span
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "5px 15px",
            }}
          >
            {record.balanceTickets}
          </span>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "imageType",
      key: "imageType",
      align: "center",
      render: (text, record) => {
        const format = text;
        if (format === "pdf" || format === "image/jpeg") {
          return (
            <span style={{ color: "green" }}>
              {"jpeg"}({record.soldTickets})
            </span>
          );
        } else {
          return <span style={{ color: "red" }}>{text}</span>;
        }
      },
    },
  ];
  // expand row
  const expandedRowRender = (record) => (
    <p style={{ margin: 0 }}>
      <strong>Token:</strong>
      {record.overAlltoken && record.overAlltoken.join(", ")}
      <br />
      <strong>Ticket Details:</strong> {record.ticketDetails}
      <br />
      <strong>Date and Time:</strong> {record.programTime}
    </p>
  );
  return (
    <div>
      <div className="buyer-section">
        <h3 className="payment-title">Token</h3>
        <h6 className="payment-title">Buyer Token's</h6>
        <Table
          columns={buyerColumns}
          dataSource={buyerData}
          expandable={{ expandedRowRender }}
        />
        <hr />
      </div>
      <div className="uploader-section">
        <h6 className="payment-title">Uploader Token's</h6>
        <Table
          columns={uploaderColumns}
          dataSource={updatedUploaderData}
          expandable={{ expandedRowRender }}
        />
      </div>
    </div>
  );
}

export default Token;
