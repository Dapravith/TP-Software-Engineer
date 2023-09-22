import React from 'react';
import "../styles/admin-dashboard/admin-dashboard.css";
import "../styles/dashboardCharts/dashboard-charts.css";
import InfoCard from './InfoCard';
import MultiBarChart from './MultiBarChart';
import PieChart from './PieChart';

const DashboardCharts = () => {
  const chartData = {
    labels: ['Label 1', 'Label 2', 'Label 3'],
    values: [30, 45, 25],
    colors: ['#ff5733', '#33ff57', '#5733ff'],
  };

  return (
    <div>
      <InfoCard />
      <div className="chart-container">
        <div className="chart">
          <MultiBarChart />
        </div>
        <div className="chart">
          <h1>Total Pie Chart</h1>
         <PieChart />
        </div>
      </div>
    </div>
  );
  }


export default DashboardCharts;
