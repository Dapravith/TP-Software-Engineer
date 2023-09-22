
import React from 'react';
import { Bar } from 'react-chartjs-2';

const MultibarChart = () => {
  // Sample data for the multibar chart
  const data = {
    labels: ['Label 1', 'Label 2', 'Label 3'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [10, 20, 30],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Dataset 2',
        data: [15, 25, 35],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: 'linear', // Use 'linear' scale for the Y-axis
        beginAtZero: true, // Start the scale at zero
      },
      x: {
        type: 'category', // Use 'category' scale for the X-axis
      },
    },
  };

  return (
    <div className="multibar-chart">
      <h3>Multibar Chart (Linear Scale)</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MultibarChart;
