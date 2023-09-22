
import React from 'react';
import { Bar } from 'react-chartjs-2';

const MultiBarChart = () => {
  const data = {
    labels: ['Category 1', 'Category 2', 'Category 3'],
    datasets: [
      {
        label: 'Data',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        data: [65, 59, 80],
      },
    ],
  };

  return <Bar data={data} />;
};

export default MultiBarChart;
