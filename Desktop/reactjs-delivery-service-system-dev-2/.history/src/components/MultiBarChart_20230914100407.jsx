// src/components/DashboardCharts/BarChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';

const MultiBarChart = () => {
  // Sample data for the bar chart
  const data = {
    labels: ['Label 1', 'Label 2', 'Label 3'],
    datasets: [
      {
        label: 'Bar Chart Data',
        data: [30, 45, 25],
        backgroundColor: ['#FF5733', '#FFD700', '#36A2EB'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Y-Axis Label',
        },
      },
      x: {
        type: 'linear',
        title: {
          display: true,
          text: 'X-Axis Label',
        },
      },
    },
  };

  return (
    <div className="bar-chart">
      <h3>Bar Chart</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MultiBarChart;
