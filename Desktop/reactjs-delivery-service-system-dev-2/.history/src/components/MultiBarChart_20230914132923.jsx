
import React from 'react';
import { Bar } from 'react-chartjs-2';

const MultiBarChart = () => {
  // Sample data for the grouped bar chart
  const data = {
    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
    datasets: [
      {
        label: 'Set 1',
        data: [20, 40, 60, 80], // Replace with your data values for Set 1
        backgroundColor: '#FF5733',
      },
      {
        label: 'Set 2',
        data: [30, 50, 70, 90], // Replace with your data values for Set 2
        backgroundColor: '#FFD700',
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
    plugins: {
      legend: {
        display: true, // Display the legend
      },
    },
  };

  return (
    <div className="grouped-bar-chart">
      <h3>View Total Profits</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MultiBarChart;
