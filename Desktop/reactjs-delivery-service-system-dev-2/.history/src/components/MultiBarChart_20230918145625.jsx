
import React from 'react';
import { Bar } from 'react-chartjs-2';

const MultiBarChart = () => {
  // Sample data for the grouped bar chart
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Income',
        data: [20, 40, 60, 80, 30, 20, 19, 53, 20, 90, 100, 55], // Replace with your data values for Set 1
        backgroundColor: '#FF5733',
      },
      {
        label: 'Expense',
        data: [20, 40, 60, 80, 30, 20, 19, 53, 22, 90, 30, 76], // Replace with your data values for Set 2
        backgroundColor: '#FFD700',
      },
    ],
  };

        data: [20, 40, 60, 80, 30 ], // Replace with your data values for Set 2
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
    plugins: {
      legend: {
        display: true, // Display the legend
      },
    },
  };

  return (
    <div className="container">
      <div className="grouped-bar-chart">
        <h3> View Total Profits</h3>
        <Bar data={data} />
      </div>
    </div>
  );
};

export default MultiBarChart;
