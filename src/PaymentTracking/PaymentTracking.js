import React from 'react';
import { Table, Button } from 'antd';

const PaymentTracking = () => {
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Buyer Login',
      dataIndex: 'buyerLogin',
      key: 'buyerLogin',
    },
    {
      title: 'Uploader Login',
      dataIndex: 'uploaderLogin',
      key: 'uploaderLogin',
    },
    {
      title: 'Uploader-A/C',
      dataIndex: 'uploaderAccount',
      key: 'uploaderAccount',
    },
    {
      title: 'Token No',
      dataIndex: 'tokenNo',
      key: 'tokenNo',
    },
    {
      title: 'Ticket Details',
      dataIndex: 'ticketDetails',
      key: 'ticketDetails',
    },
    {
      title: 'Credit',
      key: 'credit',
      dataIndex: 'credit',
      render: (text, record) => <span style={{ color: 'green' }}>₹{text}</span>,
    },
    {
      title: 'Debit',
      key: 'debit',
      dataIndex: 'debit',
      render: (text, record) => <span style={{ color: 'green' }}>₹{text}</span>,
    },
    {
      title: 'Time',
      key: 'time',
      dataIndex: 'time',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (text, record) => {
        let buttonColor = '';
        let buttonText = '';

        switch (text) {
          case 'Paid':
            return <p type="text" style={{color:"green"}} >{text}</p>;
          case 'Inprocess':
            return <p type="text" style={{color:"orange"}} >{text}</p>;
          case 'Unpaid':
            buttonColor = 'primary';
            buttonText = 'Unpaid';
            return <Button type={buttonColor} size='default'>{buttonText}</Button>;
          default:
            buttonColor = 'default';
            buttonText = 'Unknown';
        }

        return
        // return <Button type={buttonColor}>{buttonText}</Button>;
      },
    },
  ];

  const data = [
    {
      key: 'TR001',
      buyerLogin: '0000 0000',
      uploaderLogin: '0000 0000',
      uploaderAccount: 'IOB12457854A',
      tokenNo: 'TAC413DFC17',
      ticketDetails: 'Caption miller Pdf (2)',
      credit: 380,
      debit: 380,
      time: '12:30pm',
      status: 'Paid',
    },
    {
      key: 'TR002',
      buyerLogin: '0000 0000',
      uploaderLogin: '0000 0000',
      uploaderAccount: 'IOB12457854A',
      tokenNo: 'TAC413DFC17',
      ticketDetails: 'Caption miller Pdf (2)',
      credit: 380,
      debit: 380,
      time: '12:30pm',
      status: 'Inprocess',
    },
    {
      key: 'TR003',
      buyerLogin: '0000 0000',
      uploaderLogin: '0000 0000',
      uploaderAccount: 'IOB12457854A',
      tokenNo: 'TAC413DFC17',
      ticketDetails: 'Caption miller Pdf (2)',
      credit: 380,
      debit: 380,
      time: '12:30pm',
      status: 'Unpaid',
    },
  ];

  return (
    <>
      <div className="buyer-section">
        <h3 className="payment-title">Payment Tracking</h3>
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
};

export default PaymentTracking;
