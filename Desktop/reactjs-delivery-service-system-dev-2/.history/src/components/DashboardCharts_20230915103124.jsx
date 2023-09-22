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
        {/* InfoCard without a border background color */}
        <div className="info-card">
         <div className="info-card-container">
        <InfoCard title="Total BranchOwner" value={100} icon="fa fa-user" color="#3498db" />
        <InfoCard title="Total Items" value={150} icon="fa fa-shopping-bag" color="#e74c3c" />
        <InfoCard title="Total Incoming Items" value={30} icon="fa fa-arrow-down" color="#2ecc71" />
        <InfoCard title="Total Pending Items" value={10} icon="fa fa-clock" color="#f1c40f" />
        <InfoCard title="Total Delivered Items" value={115} icon="fa fa-truck" color="#9b59b6" />
        <InfoCard title="Total Profits" value={240} icon="fa fa-money" color="#27ae60" />
      </div>

        </div>
      


      {/* Center-aligned smaller PieChart */}
      <div className="charts">
      <div className="chart-left">
        <MultiBarChart />
      </div>
        <div className="chart-right">
          <PieChart />
        </div>
        <div className="table-container">
          <SummaryTableAdmin />
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
