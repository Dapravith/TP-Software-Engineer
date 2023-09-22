import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
  const data = {
    labels: ['Pending', 'Delivered', 'Returned'],
    datasets: [
      {
        data: [25, 70, 5],
        backgroundColor: [
          '#FFCE56',
          '#4CAF50',
          '#D33115',
        ],
        hoverBackgroundColor: [
          '#FFCE56',
          '#4CAF50',
          '#D33115',
        ],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Disable aspect ratio for responsive design
  };

  return (
    <div className="container-pie-chart">
      <h3>View Total Status</h3>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
