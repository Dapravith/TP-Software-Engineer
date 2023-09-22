import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
  const data = {
    labels: ['Pending', 'Delivered'],
    datasets: [
      {
        data: [25, 70],
        backgroundColor: [
          '#FFCE56',
          '#4CAF50',
          
        ],
        hoverBackgroundColor: [
          '#FFCE56',
          '#4CAF50',
        ],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Disable aspect ratio for responsive design
  };

  return (
    <>
    <h3 styles="text-align: center, justify-content: center;">View Total Status </h3>
    <div className="container-pie-chart">
      <Pie data={data} options={options} />
    </div>
    </>
  );
};

export default PieChart;
