import React from 'react';
import { Bar } from 'react-chartjs-2';

const MultiBarChart = () => {
  // Sample data for the bar chart
  const data = {
    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
    datasets: [
      {
        label: 'Twisted Percentage',
        data: [20, 40, 60, 80], // Replace with your data values
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Configuration options for the chart
  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}%`, // Add '%' to tick labels
        },
      },
    },
  };

  return (
    <div className="bar-chart">
      <h3>Twisted Vertical Bar Chart</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MultiBarChart;
