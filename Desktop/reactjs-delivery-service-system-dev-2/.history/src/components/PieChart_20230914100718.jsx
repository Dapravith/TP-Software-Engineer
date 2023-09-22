// src/components/PieChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
  // Sample data for the pie chart
  const data = {
    labels: ['Label 1', 'Label 2', 'Label 3'],
    datasets: [
      {
        data: [30, 45, 25],
        backgroundColor: ['#FF5733', '#FFD700', '#36A2EB'],
      },
    ],
  };

  const options = {
    elements: {
      arc: {
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="pie-chart">
      <h3>Pie Chart (Arc Scale)</h3>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
