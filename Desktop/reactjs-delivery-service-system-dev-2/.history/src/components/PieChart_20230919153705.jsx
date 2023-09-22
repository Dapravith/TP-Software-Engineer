import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

const PieChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get("/admin/dashboard/status-distribution")
      .then(response => {
        const data = {
          labels: ['Pending', 'Delivered'],
          datasets: [
            {
              data: [response.data.pendingCount, response.data.deliveredCount],
              backgroundColor: ['#FFCE56', '#4CAF50'],
              hoverBackgroundColor: ['#FFCE56', '#4CAF50'],
            },
          ],
        };
        setChartData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const options = {
    maintainAspectRatio: false, // Disable aspect ratio for responsive design
  };

  return (
    <>
      <h3 style={{ textAlign: 'center', justifyContent: 'center' }}>View Total Status</h3>
      <div className="container-pie-chart">
        {chartData && <Pie data={chartData} options={options} />}
      </div>
    </>
  );
};

export default PieChart;
