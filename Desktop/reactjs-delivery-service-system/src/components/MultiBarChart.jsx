import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const MultiBarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND}/admin/dashboard/total-profit`);
      const data = response.data;

      // Format the data for the chart
      const chartData = {
        labels: ['Auguest', 'September', 'October'],
        datasets: [
          {
            label: 'Income',
            data: data.income,
            backgroundColor: 'rgba(75, 192, 192, 0.6)'
          },
          {
            label: 'Expense',
            data: data.expense,
            backgroundColor: 'rgba(255, 99, 132, 0.6)'
          },
          {
            label: 'Profit',
            data: data.profit,
            backgroundColor: 'rgba(54, 162, 235, 0.6)'
          }
        ]
      };

      setChartData(chartData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>View Total Profit</h3>
      {chartData ? (
        <Bar data={chartData} options={{ responsive: true }} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default MultiBarChart;