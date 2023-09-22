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
      <h2>Admin Dashboard </h2>

      {/* InfoCard without a div border */}
      <InfoCard />

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
