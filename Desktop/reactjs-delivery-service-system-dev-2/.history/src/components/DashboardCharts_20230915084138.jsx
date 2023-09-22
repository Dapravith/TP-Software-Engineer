import React from 'react';
import "../styles/admin-dashboard/admin-dashboard.css";
import "../styles/dashboardCharts/dashboard-charts.css";
import InfoCard from './InfoCard';
import MultiBarChart from './MultiBarChart';
import PieChart from './PieChart';
import SummaryTableAdmin from './SummaryTableAdmin';
const DashboardCharts = ({ username }) => {
  return (
    <div className="dashboard">
      <div className="h2">
        <h2>Welcome {username} To Admin Dashboard!</h2>
      </div>
      
      {/* Separate div for InfoCard */}
      <div className="info-card-container">
        {/* InfoCard without a border background color */}
        <div className="info-cards">
         <div className="info-card-container">
        <InfoCard title="Total Branch Owner" value={10} icon="fa fa-user" color="#3498db" />
        <InfoCard title="Items" value={150} icon="fa fa-shopping-bag" color="#e74c3c" />
        <InfoCard title="Incoming Items" value={30} icon="fa fa-arrow-down" color="#2ecc71" />
        <InfoCard title="Pending Items" value={5} icon="fa fa-clock" color="#f1c40f" />
        <InfoCard title="Delivered Items" value={115} icon="fa fa-truck" color="#9b59b6" />
        <InfoCard title="Total Profits" value={240} icon="fa fa-money" color="#27ae60" />
      </div>

        </div>
      </div>

      {/* Left-aligned MultiBarChart */}
      <div className="center-aligned grouped-bar-chart">
        <MultiBarChart />
      </div>

      {/* Center-aligned smaller PieChart */}
      <div className="center-aligned smaller-pie-chart">
        <PieChart />
      </div>
      <div className="table">
         <SummaryTableAdmin />
      </div>
    </div>
  );
};

export default DashboardCharts;
