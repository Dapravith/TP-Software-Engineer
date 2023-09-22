
import React from 'react';
import '../styles/dashboardCharts/dashboard-charts.css';
import InfoCard from './InfoCard';
import MultiBarChart from './MultiBarChart';
import PieChart from './PieChart';

const DashboardChart = () => {
  return (
    <InfoCard />
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
