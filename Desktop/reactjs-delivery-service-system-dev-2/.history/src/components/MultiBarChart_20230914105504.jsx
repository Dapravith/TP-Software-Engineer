// src/components/VerticalBarChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';

const MultiBarChart = () => {
  // Sample data for the bar chart
  const data = {
    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
    datasets: [
      {
        label: 'Percentage',
        data: [20, 40, 60, 80], // Replace with your data values
        backgroundColor: ['#FF5733', '#FFD700', '#36A2EB', '#27AE60'],
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
        display: false, // Hide the legend
      },
    },
  };

  return (
    <div className="bar-chart">
      <h3>Vertical Bar Chart</h3>
      <Bar data={data} options={options} />
    </div>
  );
}

export default MultiBarChart;
