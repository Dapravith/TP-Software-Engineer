import React from 'react';
import "../styles/admin-dashboard/admin-dashboard.css";
import "../styles/dashboardCharts/dashboard-charts.css";
import InfoCard from './InfoCard';
import MultiBarChart from './MultiBarChart';
import PieChart from './PieChart';

const DashboardCharts = () => {
  return (
    <div className="dashboard-chart">
      <h2>Dashboard Charts</h2>
      <div className="info-card">
        <InfoCard />
        </div>
        <div className="bar-chart" >
        <MultiBarChart />
        </div>
        <div className="pie-chart">
        <PieChart />
        </div>
    </div>
  );
};

export default DashboardCharts;


