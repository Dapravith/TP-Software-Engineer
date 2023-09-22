

import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
  const data = {
    labels: ['Green', 'Pe', ''],
    datasets: [
      {
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4CAF50',
          '#9C27B0',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4CAF50',
          '#9C27B0',
        ],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Disable aspect ratio for responsive design
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
