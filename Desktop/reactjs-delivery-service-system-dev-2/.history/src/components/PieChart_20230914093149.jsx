// PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
  const data = {
    labels: ['Label 1', 'Label 2', 'Label 3'],
    datasets: [
      {
        data: [30, 45, 25],
        backgroundColor: ['#FF5733', '#FFD700', '#36A2EB'],
        hoverBackgroundColor: ['#FF5733', '#FFD700', '#36A2EB'],
      },
    ],
  };

  const options = {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const total = dataset.data.reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
          });
          const currentValue = dataset.data[tooltipItem.index];
          const percentage = ((currentValue / total) * 100).toFixed(2);
          return `${data.labels[tooltipItem.index]}: ${percentage}%`;
        },
      },
    },
  };

  return (
    <div>
      <h2>Pie Chart with Percentage</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
