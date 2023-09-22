
import React from 'react';
import '../styles/dashboardCharts/dashboard-charts.css';
import MultiBarChart from './MultiBarChart';
import PieChart from './PieChart';

const DashboardChart = () => {
  return (
    <div className="dashboard-chart">
      <h2>Dashboard Chart</h2>
      <div className="chart-container">
        <MultiBarChart />
        <PieChart />
      </div>
    </div>
  );
};

export default DashboardChart;
