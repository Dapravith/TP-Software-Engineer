// src/components/DashboardCharts.jsx
import React from 'react';
import '../styles/admin-dashboard/admin-dashboard.css';
import '../styles/dashboardCharts/dashboard-charts.css';
import InfoCard from './InfoCard';
import MultiBarChart from './MultiBarChart';
import PieChart from './PieChart';

const DashboardCharts = () => {
  return (
    <div className="dashboard-chart">
      <h2>Dashboard Charts</h2>

      {/* InfoCard components with separate borders */}
      <div className="info-card-container">
        <div className="info-card">
          <InfoCard />
        </div>
        <div className="info-card">
          <InfoCard />
        </div>
        {/* Add more InfoCard components as needed */}
      </div>

      {/* Center-aligned BarChart and PieChart */}
      <div className="center-aligned">
        <div className="bar-chart">
          <MultiBarChart />
        </div>
        <div className="pie-chart">
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
