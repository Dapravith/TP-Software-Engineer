// src/components/DashboardCharts/DashboardChart.jsx
import React from 'react';
import MultiBarChart from './MultiBarChart';
import PieChart from './PieChart';
import './styles/dashboard-charts.scss';

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
