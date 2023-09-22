import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const MultiBarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    axios.get('/admin/dashboard/total-profit', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you're using token-based authentication
      },
    })
    .then((response) => {
      const { labels, incomeData, expenseData } = response.data;
      const profitData = incomeData.map((income, index) => income - expenseData[index]);

      setChartData({
        labels: labels,
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
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, []);

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
        display: true,
      },
      datalabels: {
        color: '#000',
        formatter: (value, context) => {
          return `${value}%`;
        }
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}%`;
          }
        }
      }
    },
  };

  return (
    <div className="container">
      <div className="grouped-bar-chart">
        <h3 style={{ textAlign: 'center', justifyContent: 'center' }}>View Total Profits</h3>
        {chartData && <Bar data={chartData} options={options} />}
      </div>
    </div>
  );
};

export default MultiBarChart;
