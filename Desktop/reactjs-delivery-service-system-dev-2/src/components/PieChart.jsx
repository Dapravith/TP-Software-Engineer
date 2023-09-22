import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

const PieChart = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [deliveredCount, setDeliveredCount] = useState(0);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND}/admin/dashboard/status-distribution`)
      .then(response => {
        const statusData = response.data;
        setPendingCount(statusData.find(item => item._id === 'pending')?.count || 0);
        setDeliveredCount(statusData.find(item => item._id === 'delivered')?.count || 0);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const totalItems = pendingCount + deliveredCount;
  const pendingPercentage = ((pendingCount / totalItems) * 100).toFixed(2);
  const deliveredPercentage = ((deliveredCount / totalItems) * 100).toFixed(2);

  const data = {
    labels: ['Pending', 'Delivered'],
    datasets: [
      {
        data: [pendingPercentage, deliveredPercentage],
        backgroundColor: ['#FFCE56', '#4CAF50'],
        hoverBackgroundColor: ['#FFCE56', '#4CAF50'],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <>
      <h3 style={{ textAlign: 'center' }}>View Total Status</h3>
      <div className="container-pie-chart" style={{ width: '300px', height: '300px', margin: '0 auto' }}>
        <Pie data={data} options={options} />
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
        <ul style={{ listStyleType: 'none', paddingInlineStart: '0' }}>
          <li style={{ color: '#FFCE56', marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px', display: 'inline-block', width: '10px', height: '10px', backgroundColor: '#FFCE56', borderRadius: '50%' }}></span>
            Pending Items: {pendingCount} ({pendingPercentage}%)
          </li>
          <li style={{ color: '#4CAF50', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px', display: 'inline-block', width: '10px', height: '10px', backgroundColor: '#4CAF50', borderRadius: '50%' }}></span>
            Delivered Items: {deliveredCount} ({deliveredPercentage}%)
          </li>
        </ul>
      </div>
    </>
  );
};

export default PieChart;
