import React from 'react';
import { Bar } from 'react-chartjs-2';

const MultiBarChart = () => {
  // Sample data for the grouped bar chart
  const incomeData = [50, 80, 80, 90, 50, 70, 29, 73, 76, 95, 100, 95];
  const expenseData = [20, 40, 60, 80, 30, 20, 19, 53, 22, 90, 30, 76];

  // Calculate profits for each month
  const profitData = incomeData.map((income, index) => income - expenseData[index]);

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        backgroundColor: '#FF5733',
      },
      {
        label: 'Expense',
        data: expenseData,
        backgroundColor: '#FFD700',
      },
      {
        label: 'Profit',
        data: profitData,
        backgroundColor: '#2ECC71',
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
    <div className="container">
      <div className="grouped-bar-chart">
        <h3 style="text-align: center;">View Total Profits</h3>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default MultiBarChart;
