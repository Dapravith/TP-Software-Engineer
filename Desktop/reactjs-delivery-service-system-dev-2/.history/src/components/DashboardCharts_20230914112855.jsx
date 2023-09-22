import React from 'react';
import "../styles/admin-dashboard/admin-dashboard.css";
import "../styles/dashboardCharts/dashboard-charts.css";
import InfoCard from './InfoCard';
import MultiBarChart from './MultiBarChart';
import PieChart from './PieChart';

const DashboardCharts = () => {
  return (
    <div className="dashboard-chart">
      <h2>Admin Dashboard</h2>
      <div className="chart-container">
        <InfoCard /> {/* Use the InfoCard component here */}
        <MultiBarChart />
        <PieChart />
      </div>
    </div>
  );
};

export default DashboardCharts;


