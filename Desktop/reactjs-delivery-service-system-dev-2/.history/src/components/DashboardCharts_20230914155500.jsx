import React from 'react';
import '../styles/admin-dashboard/admin-dashboard.css';
import '../styles/dashboardCharts/dashboard-charts.css';
import InfoCard from './InfoCard';
import MultiBarChart from './MultiBarChart';
import PieChart from './PieChart';

const DashboardCharts = ({ username }) => {
  return (
    <div className="dashboard">
      <div className="h2">
        <h2>Welcome {username}! To Admin Dashboard!</h2>
      </div>
      
      {/* Separate div for InfoCard */}
      <div className="info-card-container">
        {/* InfoCard without a border background color */}
        <div className="info-cards">
          <InfoCard />
        </div>
      </div>

      {/* Center-aligned MultiBarChart */}
      <div className="center-aligned bar-chart">
        <MultiBarChart />
      </div>

      {/* Center-aligned smaller PieChart */}
      <div className="center-aligned smaller-pie-chart">
        <PieChart />
      </div>
    </div>
  );
};

export default DashboardCharts;