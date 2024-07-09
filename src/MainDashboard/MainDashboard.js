import React, { useEffect, useState } from "react";
import "./MainDashboard.css";
//icon
import AddUserIcon from "../Asset/group-icon.svg";
import { Button, Form, DatePicker, Card, Checkbox } from "antd";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
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
        name: "Platform Fees",
        data: [], // Initial empty array for platform fees data
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
        enabled: true, // Show numbers in the line
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Total Income",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // Takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 2,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        title: {
          text: "Month",
        },
      },
      yaxis: {
        title: {
          // text: "Platform Fees",
        },
        min: 0,
        max: 40, // Default max value, will be updated
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

  // Fetch data and update chart
  // Function to process the document data
  const processDocument = (doc, dateField, platformFeesByMonth) => {
    const date = doc[dateField].toDate();
    const month = date.getMonth();
    platformFeesByMonth[month] += parseFloat(doc.platform) || 0;
  };

  useEffect(() => {
    // Function to handle real-time updates
    const fetchPlatformFees = async () => {
      try {
        const platformFeesByMonth = Array(12).fill(0);

        // Listener for ticketBuyerDetails collection
        const unsubscribeTicketBuyerDetails = onSnapshot(
          collection(db, "ticketBuyerDetails"),
          (snapshot) => {
            snapshot.docs.forEach((doc) =>
              processDocument(
                doc.data(),
                "currentDateTime",
                platformFeesByMonth
              )
            );
            updateChart(platformFeesByMonth);
          }
        );

        // Listener for successPaymentUploader collection
        const unsubscribeSuccessPaymentUploader = onSnapshot(
          collection(db, "successPaymentUploader"),
          (snapshot) => {
            snapshot.docs.forEach((doc) =>
              processDocument(
                doc.data(),
                "uploaderPayDate",
                platformFeesByMonth
              )
            );
            updateChart(platformFeesByMonth);
          }
        );

        // Clean up the listeners when the component unmounts
        return () => {
          unsubscribeTicketBuyerDetails();
          unsubscribeSuccessPaymentUploader();
        };
      } catch (error) {
        console.error("Error fetching platform fees data: ", error);
      }
    };

    const updateChart = (platformFeesByMonth) => {
      const maxPlatformFee = Math.max(...platformFeesByMonth) + 10;
      setTotalIncome((prevState) => ({
        ...prevState,
        series: [
          {
            ...prevState.series[0],
            data: platformFeesByMonth,
          },
        ],
        options: {
          ...prevState.options,
          yaxis: {
            ...prevState.options.yaxis,
            max: maxPlatformFee,
          },
        },
      }));
    };

    fetchPlatformFees();
  }, []);

  // totalIncomeDonut below the total icome card
  const [totalIncomeDonut, setTotalIncomeDonut] = useState({
    series: [44, 55],
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
                color: "#333",
                offsetY: 15,
                formatter: function (val) {
                  return "Sports";
                },
              },
              value: {
                showAlways: true,
                color: "#333",
                offsetY: -15,
                formatter: function (val) {
                  return val;
                },
              },
            },
          },
        },
      },
      responsive: [
        {
          breakpoint: 380,
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
      labels: ["Week", "Month"],
    },
  });

  // Overall Upload Ticket
  const [uploadTicket, setUploadTicket] = useState({
    series: [
      {
        name: "Month",
        data: [],
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
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Overall Upload Ticket",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f7f7f7", "transparent"],
          opacity: 0.5,
        },
      },
      markers: {
        size: 2,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        title: {
          text: "Month",
        },
      },
      yaxis: {
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

  // Fetch upload ticket data from Firestore
  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const ticketDetailsCollection = collection(db, "ticketDetails");
        const sportTicketDetailsCollection = collection(
          db,
          "sportTicketDetails"
        );

        const [ticketDetailsSnapshot, sportTicketDetailsSnapshot] =
          await Promise.all([
            getDocs(ticketDetailsCollection),
            getDocs(sportTicketDetailsCollection),
          ]);

        const ticketDetailsList = ticketDetailsSnapshot.docs.map((doc) =>
          doc.data()
        );
        const sportTicketDetailsList = sportTicketDetailsSnapshot.docs.map(
          (doc) => doc.data()
        );

        const ticketCounts = Array(12).fill(0);

        ticketDetailsList.forEach((ticket) => {
          if (ticket?.currentDateTime?.seconds) {
            const monthIndex = new Date(
              ticket.currentDateTime.seconds * 1000
            ).getMonth();
            ticketCounts[monthIndex] += parseInt(ticket.totalTicketCount, 10);
          }
        });

        sportTicketDetailsList.forEach((ticket) => {
          if (ticket?.currentDateTime?.seconds) {
            const monthIndex = new Date(
              ticket.currentDateTime.seconds * 1000
            ).getMonth();
            ticketCounts[monthIndex] += parseInt(
              ticket.totalSPortsTicketCount,
              10
            );
          }
        });

        const maxTicketCount = Math.ceil(Math.max(...ticketCounts));

        setUploadTicket((prevState) => ({
          ...prevState,
          series: [
            {
              ...prevState.series[0],
              data: ticketCounts,
            },
          ],
          options: {
            ...prevState.options,
            yaxis: {
              ...prevState.options.yaxis,
              max: maxTicketCount + 10,
            },
          },
        }));
      } catch (error) {
        console.error("Error fetching ticket data: ", error);
      }
    };

    // Initial fetch
    fetchTicketData();

    // Real-time listener setup
    const ticketDetailsCollection = collection(db, "TicketDetails");
    const sportTicketDetailsCollection = collection(db, "sportsTicketDetails");

    const unsubscribeTicketDetails = onSnapshot(
      ticketDetailsCollection,
      (snapshot) => {
        const ticketDetailsList = snapshot.docs.map((doc) => doc.data());
        const ticketCounts = Array(12).fill(0);

        ticketDetailsList.forEach((ticket) => {
          if (ticket?.currentDateTime?.seconds) {
            const monthIndex = new Date(
              ticket.currentDateTime.seconds * 1000
            ).getMonth();
            ticketCounts[monthIndex] += parseInt(ticket.totalTicketCount, 10);
          }
        });

        setUploadTicket((prevState) => {
          const combinedCounts = [...prevState.series[0].data];
          combinedCounts.forEach((count, index) => {
            combinedCounts[index] =
              ticketCounts[index] + (combinedCounts[index] || 0);
          });

          const maxTicketCount = Math.ceil(Math.max(...combinedCounts));

          return {
            ...prevState,
            series: [
              {
                ...prevState.series[0],
                data: combinedCounts,
              },
            ],
            options: {
              ...prevState.options,
              yaxis: {
                ...prevState.options.yaxis,
                max: maxTicketCount + 10,
              },
            },
          };
        });
      }
    );

    const unsubscribeSportTicketDetails = onSnapshot(
      sportTicketDetailsCollection,
      (snapshot) => {
        const sportTicketDetailsList = snapshot.docs.map((doc) => doc.data());
        const sportTicketCounts = Array(12).fill(0);

        sportTicketDetailsList.forEach((ticket) => {
          if (ticket?.currentDateTime?.seconds) {
            const monthIndex = new Date(
              ticket.currentDateTime.seconds * 1000
            ).getMonth();
            sportTicketCounts[monthIndex] += parseInt(
              ticket.totalSPortsTicketCount,
              10
            );
          }
        });

        setUploadTicket((prevState) => {
          const combinedCounts = [...prevState.series[0].data];
          combinedCounts.forEach((count, index) => {
            combinedCounts[index] =
              sportTicketCounts[index] + (combinedCounts[index] || 0);
          });

          const maxTicketCount = Math.ceil(Math.max(...combinedCounts));

          return {
            ...prevState,
            series: [
              {
                ...prevState.series[0],
                data: combinedCounts,
              },
            ],
            options: {
              ...prevState.options,
              yaxis: {
                ...prevState.options.yaxis,
                max: maxTicketCount + 10,
              },
            },
          };
        });
      }
    );

    return () => {
      unsubscribeTicketDetails();
      unsubscribeSportTicketDetails();
    };
  }, []);

  // Helper function to format Firestore timestamp to month for overall download ticket
  const getMonthName = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString("default", { month: "short" });
  };

  const [downloadTicket, setDownloadTicket] = useState({
    series: [
      // {
      //   name: "Week",
      //   data: [],
      // },
      {
        name: "Month",
        data: [],
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
        enabled: true, // showing number in the line
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Overall Download Ticket",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      markers: {
        size: 2,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        title: {
          text: "Month",
        },
      },
      yaxis: {
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
  // Fetch Buyer ticket data from Firestore
  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const ticketDetailsCollection = collection(db, "ticketBuyerDetails");
        const ticketDetailsSnapshot = await getDocs(ticketDetailsCollection);
        const ticketDetailsList = ticketDetailsSnapshot.docs.map((doc) =>
          doc.data()
        );

        const ticketCounts = Array(12).fill(0);

        ticketDetailsList.forEach((ticket) => {
          const monthIndex = new Date(
            ticket.currentDateTime.seconds * 1000
          ).getMonth();
          if (ticket.ticketCount) {
            ticketCounts[monthIndex] += ticket.ticketCount;
          }
          if (ticket.sportsTicketCount) {
            ticketCounts[monthIndex] += ticket.sportsTicketCount;
          }
        });

        const maxTicketCount = Math.ceil(Math.max(...ticketCounts));

        setDownloadTicket((prevState) => ({
          ...prevState,
          series: [
            {
              ...prevState.series[0],
              data: ticketCounts,
            },
          ],
          options: {
            ...prevState.options,
            yaxis: {
              ...prevState.options.yaxis,
              max: maxTicketCount + 10,
            },
          },
        }));
      } catch (error) {
        console.error("Error fetching ticket data: ", error);
      }
    };

    // Initial fetch
    fetchTicketData();

    // Real-time listener setup
    const ticketDetailsCollection = collection(db, "ticketBuyerDetails");
    const unsubscribe = onSnapshot(ticketDetailsCollection, (snapshot) => {
      const ticketDetailsList = snapshot.docs.map((doc) => doc.data());

      const ticketCounts = Array(12).fill(0);

      ticketDetailsList.forEach((ticket) => {
        const monthIndex = new Date(
          ticket.currentDateTime.seconds * 1000
        ).getMonth();
        if (ticket.ticketCount) {
          ticketCounts[monthIndex] += ticket.ticketCount;
        }
        if (ticket.sportsTicketCount) {
          ticketCounts[monthIndex] += ticket.sportsTicketCount;
        }
      });

      const maxTicketCount = Math.ceil(Math.max(...ticketCounts));

      setDownloadTicket((prevState) => ({
        ...prevState,
        series: [
          {
            ...prevState.series[0],
            data: ticketCounts,
          },
        ],
        options: {
          ...prevState.options,
          yaxis: {
            ...prevState.options.yaxis,
            max: maxTicketCount + 10,
          },
        },
      }));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Overall Ticket details semi Circle gauge chart
  const [overallTicketDetails, setOverallTicketDetails] = useState({
    series: [], // Initial value
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

  const [ticketCounts, setTicketCounts] = useState({
    sold: 0,
    remaining: 0,
    notSold: 0,
  });

  const [activeButton, setActiveButton] = useState("sold");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketDetailsSnapshot = await getDocs(
          collection(db, "TicketDetails")
        );
        const sportTicketDetailsSnapshot = await getDocs(
          collection(db, "sportsTicketDetails")
        );
        const buyerDetailsSnapshot = await getDocs(
          collection(db, "ticketBuyerDetails")
        );

        if (
          !ticketDetailsSnapshot ||
          !sportTicketDetailsSnapshot ||
          !buyerDetailsSnapshot
        ) {
          throw new Error("Failed to fetch data from Firebase");
        }

        const ticketDetails = ticketDetailsSnapshot.docs.map((doc) =>
          doc.data()
        );
        const sportTicketDetails = sportTicketDetailsSnapshot.docs.map((doc) =>
          doc.data()
        );
        const buyerTicketDetails = buyerDetailsSnapshot.docs.map((doc) =>
          doc.data()
        );

        const currentTime = new Date();

        // Calculate sold ticket count
        const soldTicketCount =
          buyerTicketDetails.reduce((acc, ticket) => {
            return acc + parseInt(ticket.ticketCount);
          }, 10) +
            buyerTicketDetails.reduce((acc, ticket) => {
              return acc + parseInt(ticket.sportsTicketCount);
            }, 10);
        console.log("MT", parseInt(buyerDetailsSnapshot.ticketCount));
        console.log("ST", parseInt(buyerDetailsSnapshot.sportsTicketCount));
        // Calculate remaining ticket count
        const remainingTicketCount =
          ticketDetails.reduce((acc, ticket) => {
            const showTime = new Date(ticket.showTime.seconds * 1000);
            if (showTime > currentTime) {
              return acc + parseInt(ticket.ticketCount, 10);
            }
            return acc;
          }, 0) +
          sportTicketDetails.reduce((acc, ticket) => {
            const matchTime = new Date(ticket.matchTime.seconds * 1000);
            if (matchTime > currentTime) {
              return acc + parseInt(ticket.sportsTicketCount, 10);
            }
            return acc;
          }, 0);

        // Calculate not sold ticket count
        console.log("R", remainingTicketCount);
        const notSoldTicketCount =
          ticketDetails.reduce((acc, ticket) => {
            const showTime = new Date(ticket.showTime.seconds * 1000);
            if (showTime < currentTime) {
              return acc + parseInt(ticket.ticketCount, 10);
            }
            return acc;
          }, 0) +
          sportTicketDetails.reduce((acc, ticket) => {
            const matchTime = new Date(ticket.matchTime.seconds * 1000);
            if (matchTime < currentTime) {
              return acc + parseInt(ticket.sportsTicketCount, 10);
            }
            return acc;
          }, 0);

        // const totalTicketCount = soldTicketCount + remainingTicketCount + notSoldTicketCount;

        // const soldPercentage = (soldTicketCount / totalTicketCount) * 100;
        // const remainingPercentage = (remainingTicketCount / totalTicketCount) * 100;
        // const notSoldPercentage = (notSoldTicketCount / totalTicketCount) * 100;
        setTicketCounts({
          sold: soldTicketCount,
          remaining: remainingTicketCount,
          notSold: notSoldTicketCount,
        });

        // Initialize with sold tickets data
        setOverallTicketDetails((prevDetails) => ({
          ...prevDetails,
          series: [soldTicketCount],
        }));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const updateChart = (type) => {
    setActiveButton(type);
    const seriesValue =
      type === "sold"
        ? ticketCounts.sold
        : type === "remaining"
        ? ticketCounts.remaining
        : ticketCounts.notSold;

    setOverallTicketDetails((prevDetails) => ({
      ...prevDetails,
      series: [seriesValue],
    }));
  };
  // Overall details
  const [movie, setMovie] = useState({
    series: [],
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
                color: "#333",
                offsetY: 15,
                formatter: function (val) {
                  return "Movie";
                },
              },
              value: {
                showAlways: true,
                color: "#333",
                offsetY: -15,
                formatter: function (val) {
                  return val;
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
      labels: ["Download", "Not sold", "Upload", "Remaining"],
      colors: ["#1486FF", "#05DFAD", "#BFDEFF", "#0C0815"],
    },
  });

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const ticketDetailsCollection = collection(db, "TicketDetails");
        const ticketDetailsSnapshot = await getDocs(ticketDetailsCollection);
        const ticketDetailsList = ticketDetailsSnapshot.docs.map((doc) =>
          doc.data()
        );

        let downloadCount = 0;
        let notSoldCount = 0;
        let uploadCount = 0;
        let remainingCount = 0;
        const currentTime = new Date(); // Current time

        ticketDetailsList.forEach((ticket) => {
          const showTime = new Date(ticket.showTime.seconds * 1000); // Convert Firestore timestamp to Date object
          const totalTicketCount = parseInt(ticket.totalTicketCount, 10);
          const ticketCount = parseInt(ticket.ticketCount, 10);

          // Calculate download count and upload count
          downloadCount += totalTicketCount - ticketCount;
          uploadCount += totalTicketCount;

          if (showTime < currentTime) {
            // If show time has passed, count as not sold
            notSoldCount += ticketCount;
          } else {
            // If show time has not passed, consider the ticket count as remaining
            remainingCount +=
              totalTicketCount - (totalTicketCount - ticket.ticketCount);
          }
        });
        setMovie((prevState) => ({
          ...prevState,
          series: [downloadCount, notSoldCount, uploadCount, remainingCount],
        }));
      } catch (error) {
        console.error("Error fetching ticket data: ", error);
      }
    };

    fetchMovieData();
  }, []);

  // remainingCount =(ticketCount + notSoldCount)-ticketCount;

  // 2nD Row sports donut
  const [sports, setSports] = useState({
    series: [],
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
                color: "#333",
                offsetY: 15,
                formatter: function (val) {
                  return "Sports";
                },
              },
              value: {
                showAlways: true,
                color: "#333",
                offsetY: -15,
                formatter: function (val) {
                  return val;
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
      labels: ["Download", "Not sold", "Upload", "Remaining"],
      colors: ["#1486FF", "#05DFAD", "#BFDEFF", "#0C0815"],
    },
  });

  useEffect(() => {
    const fetchSportsData = async () => {
      try {
        const sportsTicketDetailsCollection = collection(
          db,
          "sportsTicketDetails"
        );
        const sportsTicketDetailsSnapshot = await getDocs(
          sportsTicketDetailsCollection
        );
        const sportsTicketDetailsList = sportsTicketDetailsSnapshot.docs.map(
          (doc) => doc.data()
        );

        let downloadCount = 0;
        let notSoldCount = 0;
        let uploadCount = 0;
        let remainingCount = 0;

        const currentTime = new Date();

        sportsTicketDetailsList.forEach((ticket) => {
          const matchTime = new Date(ticket.matchTime.seconds * 1000);
          const totalSportsTicketCount = parseInt(
            ticket.totalSPortsTicketCount,
            10
          );
          const sportsTicketCount = parseInt(ticket.sportsTicketCount, 10);

          downloadCount =
            downloadCount + (totalSportsTicketCount - sportsTicketCount);
          uploadCount = uploadCount + totalSportsTicketCount;
          // remainingCount = remainingCount + sportsTicketCount;

          if (matchTime < currentTime) {
            notSoldCount += sportsTicketCount;
          } else {
            remainingCount =
              totalSportsTicketCount -
              (totalSportsTicketCount - sportsTicketCount);
          }
        });

        setSports((prevState) => ({
          ...prevState,
          series: [downloadCount, notSoldCount, uploadCount, remainingCount],
        }));
      } catch (error) {
        console.error("Error fetching sports ticket data: ", error);
      }
    };

    fetchSportsData();
  }, []);

  // over details is bank account given details from the collection "UploaderAccountDetails"
  const [uploaderCount, setUploaderCount] = useState(0); //"UploaderAccountDetails collection name"
  const [downloaderCount, setDownloaderCount] = useState(0); //"ticketBuyerDetails collection name"

  const getDocumentCount = async (collectionName) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.size;
  };

  useEffect(() => {
    const fetchData = async () => {
      const uploaderCount = await getDocumentCount("UploaderAccountDetails");
      const downloaderCount = await getDocumentCount("ticketBuyerDetails");
      setUploaderCount(uploaderCount);
      setDownloaderCount(downloaderCount);
    };

    fetchData();
  }, []);

  return (
    <>
      {/* Heading title  */}
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="payment-title">Main DashBoard</h3>
        <Form.Item name="date-picker" {...config}>
          <RangePicker
            style={{ width: 220, height: 28, fontSize: 12, padding: "16px" }}
          />
        </Form.Item>
      </div>

      {/*1st row*/}
      {/* Total income card chart */}
      <div className="main-grid-container">
        <Card bordered className="item item-1">
          <div className="d-flex justify-content-between">
            <h6>Today Activity </h6>
            <RangePicker
              style={{ width: 220, height: 28, fontSize: 12, padding: "16px" }}
            />
          </div>
          {/* Total main Line grid div */}
          <div className="mt-3">
            <LineChart
              className="line-chart-container"
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
            <RangePicker
              style={{ width: 220, height: 28, fontSize: 12, padding: "16px" }}
            />
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
        <Card className="justify-content-around item item-3">
          <div className="card-container-bg p-4 rounded-3 w-100">
            <div className="d-flex justify-content-between">
              <h6>Ticket uploder user </h6>
              <RangePicker
                style={{
                  width: 180,
                  height: 28,
                  fontSize: 12,
                  padding: "16px",
                }}
              />
            </div>
            <div className="d-flex align-items-center">
              <img
                src={AddUserIcon}
                width={30}
                height={30}
                className="Adduser-img"
                alt=""
              />
              <h2 className="ms-3">{uploaderCount}</h2>
            </div>
          </div>

          <div className="card-container-bg mt-4 p-4 rounded-3 w-100">
            <div className="d-flex justify-content-between">
              <h6>Ticket downloader user </h6>
              <RangePicker
                style={{
                  width: 180,
                  height: 28,
                  fontSize: 12,
                  padding: "16px",
                }}
              />
            </div>
            <div className="d-flex align-items-center">
              <img
                src={AddUserIcon}
                width={30}
                height={30}
                className="Adduser-img"
                alt=""
              />
              <h2 className="ms-3">{downloaderCount}</h2>
            </div>
          </div>
        </Card>

        {/* Overall Download card chart */}
        <Card className="item item-4">
          <div className="d-flex justify-content-between">
            <h6>Today Activity </h6>
            <RangePicker
              style={{ width: 220, height: 28, fontSize: 12, padding: "16px" }}
            />
          </div>
          <div className="d-flex align-items-center mt-3">
            <LineChart
              data={downloadTicket}
              type="line"
              width={380}
              className="line-chart-container"
              height={280}
            />
          </div>
        </Card>

        {/* Overall Ticket details card chart */}
        <Card className="item item-5">
          <div className="d-flex justify-content-between">
            <h6>Overall Ticket Details</h6>
            <DatePicker onChange={onChange} picker="month" />
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
            <Button
              size="small"
              type="default"
              onClick={() => updateChart("sold")}
              className={activeButton === "sold" ? "active" : ""}
            >
              Sold ticket
            </Button>
            <Button
              size="small"
              type="default"
              className={activeButton === "remaining" ? "active" : ""}
              onClick={() => updateChart("remaining")}
            >
              Remaining Ticket
            </Button>
            <Button
              size="small"
              type="default"
              className={activeButton === "notSold" ? "active" : ""}
              onClick={() => updateChart("notSold")}
            >
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
          <RangePicker
            style={{ width: 220, height: 28, fontSize: 12, padding: "16px" }}
          />
        </div>
        <div className="overall-details">
          <LineChart data={movie} type="donut" width={320} />
          <LineChart data={sports} type="donut" width={320} />
          <div
            style={{
              width: 150,
              height: 150,
              border: "15px solid black",
              borderRadius: "50%",
            }}
          >
            <p className="d-flex justify-content-center align-items-center h-100">
              {" "}
              Event column{" "}
            </p>
          </div>
          {/* This chart is for events */}
          {/* <LineChart data={totalIncomeDonut} type="donut" width={320} /> */}
        </div>
      </div>
    </>
  );
}

export default MainDashboard;
