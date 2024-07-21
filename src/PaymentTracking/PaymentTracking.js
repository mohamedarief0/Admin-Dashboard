import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { Timestamp } from "firebase/firestore";
import sandClockSvg from "../Asset/sand-clock-svgrepo-com.svg";
import tickCirclesvg from "../Asset/tick-circle-svgrepo-com.svg";
import CloudGarageLogo from "../Asset/CG Logo.PNG";

const PaymentTracking = ({ setNotificationCount }) => {
  const [tableData, setTableData] = useState([]);
  const formatTimestamp = (timestamp) => {
    if (timestamp instanceof Timestamp) {
      const date = timestamp.toDate();
      return new Date(
        date.getTime() + date.getTimezoneOffset() * 60000 + 5.5 * 3600000
      ).toLocaleString(); // Adjusted for IST (UTC+5:30)
    }
    if (
      timestamp &&
      typeof timestamp === "object" &&
      "seconds" in timestamp &&
      "nanoseconds" in timestamp
    ) {
      const date = new Date(
        timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
      );
      return new Date(
        date.getTime() + date.getTimezoneOffset() * 60000 + 5.5 * 3600000
      ).toLocaleString(); // Adjusted for IST (UTC+5:30)
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
          const TicketType = docData.movieName ? "movie" : "sport";
          const allTicketToken =
            docData.ticketToken || docData.sportsTicketToken;
          const programTime = formatTimestamp(
            docData.showTime || docData.matchTime
          );

          let formattedDate = "Invalid date";
          try {
            let currentDateTime = docData.matchTime || docData.showTime;
            if (currentDateTime instanceof Timestamp) {
              currentDateTime = currentDateTime.toDate();
            } else {
              currentDateTime = new Date(currentDateTime);
            }
            if (!isNaN(currentDateTime)) {
              formattedDate = currentDateTime.toISOString().split("T")[0];
            }
          } catch (error) {
            console.error("Invalid date format:", error);
          }
          return {
            id: doc.id,
            ...docData,
            showTime: formattedDate,
            allTicketToken,
            programTime,
            TicketType: TicketType,
            status: docData.status || "Unknown", // Make sure to include the status
          };
        });
        return data;
      } catch (error) {
        console.error("Error fetching buyer data:", error);
        return [];
      }
    };

    const fetchUploaderData = async () => {
      try {
        const ticketDetailsquerySnapshot = await getDocs(
          collection(db, "TicketDetails")
        );
        const sportTicketDetailsquerySnapshot = await getDocs(
          collection(db, "sportsTicketDetails")
        );

        const ticketDetailsData = ticketDetailsquerySnapshot.docs.map((doc) => {
          const docData = doc.data();
          let formattedDate = "Invalid date";
          try {
            let currentDateTime = docData.showTime;
            if (currentDateTime instanceof Timestamp) {
              currentDateTime = currentDateTime.toDate();
            } else {
              currentDateTime = new Date(currentDateTime);
            }
            if (!isNaN(currentDateTime)) {
              formattedDate = currentDateTime.toISOString().split("T")[0];
            }
          } catch (error) {
            console.error("Invalid date format:", error);
          }
          return {
            key: doc.id,
            ...docData,
            currentDateTime: formattedDate,
            type: "movie", // Marking the type to differentiate later
          };
        });

        const sportTicketDetailsData = sportTicketDetailsquerySnapshot.docs.map(
          (doc) => {
            const docData = doc.data();
            let formattedDate = "Invalid date";
            try {
              let currentDateTime = docData.matchTime;
              if (currentDateTime instanceof Timestamp) {
                currentDateTime = currentDateTime.toDate();
              } else {
                currentDateTime = new Date(currentDateTime);
              }
              if (!isNaN(currentDateTime)) {
                formattedDate = currentDateTime.toISOString().split("T")[0];
              }
            } catch (error) {
              console.error("Invalid date format:", error);
            }
            return {
              key: doc.id,
              ...docData,
              currentDateTime: formattedDate,
              type: "sport", // Marking the type to differentiate later
            };
          }
        );

        return {
          ticketDetailsData,
          sportTicketDetailsData,
        };
      } catch (error) {
        console.error("Error fetching uploader data:", error);
        return {
          ticketDetailsData: [],
          sportTicketDetailsData: [],
        };
      }
    };

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "ticketBuyerDetails")
        );
        const data = querySnapshot.docs.map((doc) => doc.data());

        // Example logic to count new data
        const newDataCount = data.filter(
          (item) => item.status === "new"
        ).length;

        setNotificationCount(newDataCount);
        setTableData(data); // Set your table data here
      } catch (error) {
        console.error("Error fetching data:", error);
      } // notifictionode

      const buyerData = await fetchBuyerData();
      const { ticketDetailsData, sportTicketDetailsData } =
        await fetchUploaderData();

      const combinedData = buyerData.map((buyer) => {
        let uploader;
        if (buyer.TicketType === "movie") {
          uploader = ticketDetailsData.find(
            (upload) =>
              Array.isArray(upload.overAlltoken) &&
              upload.overAlltoken.includes(buyer.allTicketToken)
          );
        } else if (buyer.TicketType === "sport") {
          uploader = sportTicketDetailsData.find(
            (upload) =>
              Array.isArray(upload.overAlltoken) &&
              upload.overAlltoken.includes(buyer.allTicketToken)
          );
        }
        // this value only show in the table if the buyertoken and uploder token is same
        return {
          ...buyer,
          buyerId:buyer.id,
          buyerLogin: buyer.phoneNumber,
          uploaderLogin: uploader ? uploader.userPhoneNumber : "N/A",
          accountTypeUploder: uploader
            ? uploader.uploaderAccountNumber || uploader.uploaderUpiId
            : "N/A",
          ticketDetails: buyer.movieName || buyer.teamNames,
          ticketCount: buyer.ticketCount || buyer.sportsTicketCount,
          totalAmount: buyer.totalAmount || buyer.totalSportsAmount,
          userTicketPrice:
            buyer.withoutTaxTotalAmountMovie || buyer.withoutTaxAmountSports,
          showTime: buyer.showTime,
          platform: buyer.platform,
          // status: "Unknown", // Default status
          status: buyer.status || "Unknown", // Make sure to include the status
        };
      });

      setTableData(combinedData);
    };

    fetchData();
  }, [setNotificationCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTableData((prevData) =>
        prevData.map((item) => {
          const now = new Date();
          const programTime = new Date(item.programTime);
          const timeDifference = programTime - now;
          const status = item.status;

          if (status === "Cancel" || status === "Paid") {
            // return item; // Skip updates for canceled and paid items
            return {
              ...item,
              status: status,
              countdown: "00:00:00",
            };
          }

          if (!isNaN(timeDifference)) {
            if (timeDifference > 0) {
              // Countdown logic
              const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
              const hours = Math.floor(
                (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
              );
              const minutes = Math.floor(
                (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
              );
              const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

              return {
                ...item,
                countdown: `${String(days).padStart(2, "0")} days ${String(
                  hours
                ).padStart(2, "0")} hrs ${String(minutes).padStart(
                  2,
                  "0"
                )} mins ${String(seconds).padStart(2, "0")} secs`,
                status: item.status === "Inprocess" ? "Unknown" : item.status,
              };
            } else {
              // After show time logic
              const forwardTime = now - programTime;
              const forwardHours = Math.floor(forwardTime / (1000 * 60 * 60));
              const forwardMinutes = Math.floor(
                (forwardTime % (1000 * 60 * 60)) / (1000 * 60)
              );
              const forwardSeconds = Math.floor(
                (forwardTime % (1000 * 60)) / 1000
              );

              if (forwardHours < 3) {
                return {
                  ...item,
                  status: "Inprocess",
                  countdown: `+${String(forwardHours).padStart(
                    2,
                    "0"
                  )}:${String(forwardMinutes).padStart(2, "0")}:${String(
                    forwardSeconds
                  ).padStart(2, "0")}`,
                };
              } else {
                return {
                  ...item,
                  status: "PayDecision",
                  countdown: "00:00:00",
                };
              }
            }
          }
          return item; // In case of invalid timeDifference
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const paymentSuccessHandler = async (record) => {
    try {
      const successData = {
        id: record.userId,
        uploaderPayDate: new Date(),
        uploaderLogin: record.uploaderLogin,
        ticketDetails: record.ticketDetails,
        accountTypeUploder: record.accountTypeUploder,
        totalAmount: record.totalAmount, //177
        userTicketPrice: record.withoutTaxTotalAmountMovie,
        platform: record.platform, //36.2
        ticketCount: record.ticketCount,
      };

      // Add a new document to the "successPaymentUploader" collection
      await addDoc(collection(db, "successPaymentUploader"), successData);

      // Update the status to "Paid" in the "ticketBuyerDetails" collection
      const buyerDocRef = doc(db, "ticketBuyerDetails", record.id);
      await updateDoc(buyerDocRef, { status: "Paid" });

      // Update the local state to reflect the change
      setTableData((prevData) =>
        prevData.map((item) =>
          item.id === record.id ? { ...item, status: "Paid" } : item
        )
      );
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  const handlePayment = async (record) => {
    if (!window.Razorpay) {
      console.error("Razorpay script not loaded");
      return;
    }

    const options = {
      key: "rzp_test_VnYoaZDa6TDXAT",
      amount:
        (record.withoutTaxTotalAmountMovie || record.withoutTaxAmountSports) *
        100,
      currency: "INR",
      name: "Cloud Garage",
      description:
        "Hey, Ticket uploader here is your money from the TikTik app for the " +
        `${record.ticketDetails}` +
        "and the ticket" +
        `${record.ticketCount}`,
      image: CloudGarageLogo,
      order_id: record.orderId,
      handler: async function (response) {
        console.log(response);
        await paymentSuccessHandler(record);
      },
      prefill: {
        name: record.uploaderLogin || "Arief",
        email: record.uploaderEmail || "arief@example.com",
        contact: record.userPhoneNumber || "9988776655",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#262626",
      },
    };

    try {
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error creating Razorpay instance:", error);
    }
  };

  const handleUnpaid = async (record) => {
    try {
      // Update the status to "Cancel" in the "ticketBuyerDetails" collection
      const buyerDocRef = doc(db, "ticketBuyerDetails", record.id);
      await updateDoc(buyerDocRef, { status: "Cancel" });

      // Update status to "Cancel" in local state
      setTableData((prevData) =>
        prevData.map((item) =>
          item.id === record.id ? { ...item, status: "Cancel" } : item
        )
      );
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };
  const columns = [
    {
      title: "User ID",
      dataIndex: "buyerId",
      key: "buyerId", response: ["lg","md","sm"],
    },
    {
      title: "Buyer Phone Number",
      dataIndex: "buyerLogin",
      key: "buyerLogin",
    },
    {
      title: "Uploader Phone Number",
      dataIndex: "uploaderLogin",
      key: "uploaderLogin",
    },
    {
      title: "Uploader A/C",
      dataIndex: "accountTypeUploder",
      key: "accountTypeUploder",
    },
    {
      title: "Token No",
      dataIndex: "allTicketToken",
      key: "allTicketToken",
      align: "center",
    },
    {
      title: "Ticket Details",
      dataIndex: "ticketDetails",
      key: "ticketDetails",
      response: ["lg","md","sm"],
      
      render: (text, record) => (
        <>
          {record.TicketType === "movie" ? (
            <>
              {record.movieName} ({record.imageType} ({record.ticketCount})
              {record.programTime})
            </>
          ) : (
            <>
              {record.teamNames} ({record.imageType} ({record.ticketCount}
              ){record.programTime})
            </>
          )}
        </>
      ),
    },
    {
      title: "Credit",
      dataIndex: "totalAmount",
      key: "totalAmount",
      align: "right", response: ["lg","md","sm"],
      render: (text) => <span style={{ color: "green" }}>₹{text}</span>,
    },
    {
      title: "Debit",
      dataIndex: "userTicketPrice",
      key: "userTicketPrice",
      align: "right", response: ["lg","md","sm"],
      render: (text) => <span style={{ color: "green" }}>₹{text}</span>,
    },
    {
      title: "Time (D:Hr:Min:Sec)",
      key: "countdown",
      dataIndex: "countdown",
      align: "center", response: ["lg","md","sm"],
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      align: "center", response: ["lg","md","sm"],
      render: (text, record) => {
        switch (text) {
          case "Paid":
            return (
              <p
                style={{
                  color: "green",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {text}{" "}
                <img
                  src={tickCirclesvg}
                  alt="Tick Circle"
                  style={{
                    marginLeft: 8,
                    width: 16,
                    height: 16,
                    color: "green",
                  }}
                />
              </p>
            );
          case "Inprocess":
            return (
              <p
                style={{
                  color: "orange",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {text}
                <img
                  src={sandClockSvg}
                  alt="Sand Clock"
                  style={{
                    marginLeft: 8,
                    width: 16,
                    height: 16,
                    color: "orange",
                  }}
                />
              </p>
            );
          case "PayDecision":
            return (
              <div style={{ display: "flex", gap: "10px" }}>
                <Button
                  type="primary"
                  size="default"
                  onClick={() => handlePayment(record)}
                >
                  Pay
                </Button>
                <Button
                  type="default"
                  size="default"
                  onClick={() => handleUnpaid(record)}
                >
                  Cancel
                </Button>
              </div>
            );
          case "Cancel":
            return <div style={{ color: "red" }}>Cancel</div>;
          case "Unknown":
            return (
              <Button type="default" size="default">
                Unknown
              </Button>
            );
          default:
            return <span>{text}</span>;
        }
      },
    },
  ];

  return (
    <div className="buyer-section">
      <h3 className="payment-title">Payment Tracking</h3>
      <Table columns={columns} dataSource={tableData} />
    </div>
  );
};

export default PaymentTracking;
