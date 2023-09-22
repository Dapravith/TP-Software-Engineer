import React, { useContext }from 'react';
import "../styles/admin-dashboard/admin-dashboard.css";
import "../styles/dashboardCharts/dashboard-charts.css";
import InfoCard from './InfoCard';
import MultiBarChart from './MultiBarChart';
import PieChart from './PieChart';
import { ThemeSwitchButton } from './theme';
import RecentlyDeliveredTable from './RecentlyDeliveredTable';


const DashboardCharts = ({ username }) => {
  const deliveries = [
    { code: 'C123', products: 'Laptop', deliveryDate: '2023-09-15', status: 'pending' },
    { code: 'C124', products: 'Phone', deliveryDate: '2023-09-14', status: 'delivered' },
    { code: 'C125', products: 'Camera', deliveryDate: '2023-09-13', status: 'returned' },
    { code: 'C126', products: 'Camera1', deliveryDate: '2023-09-13', status: 'returned' },
    ];
  return (
    <div className="dashboard">
      <div className="h2">
        <h2>Welcome {username} To Admin Dashboard!</h2>
      </div>
        {/* InfoCard without a border background color */}
        <div className="info-card">
         <div className="info-card-container">
        <InfoCard title="Total BranchOwner" value={100} icon="fa fa-users" color="#3498db" />
        <InfoCard title="Total Items" value={150} icon="fa fa-shopping-bag" color="#e74c3c" />
        <InfoCard title="Total Incoming Items" value={30} icon="fa fa-shopping-cart" color="#2ecc71" />
        <InfoCard title="Total Pending Items" value={10} icon="fa fa-clock-o" color="#f1c40f" />
        <InfoCard title="Total Delivered Items" value={115} icon="fa fa-truck" color="#9b59b6" />
        <InfoCard title="Total Profits" value={240} icon="fa fa-money" color="#27ae60" />
      </div>

        </div>
      
      {/* Center-aligned smaller PieChart */}
      <div className="charts">
      <div className="multi-bar-chart">
        <MultiBarChart />
      </div>
        <div className="pie-chart">
          <PieChart />
        </div>
        <div className="recently-delivered-table">
          <RecentlyDeliveredTable data= {deliveries} />
        </div>
      </div>
    </div>
  );
};


export default DashboardCharts;
