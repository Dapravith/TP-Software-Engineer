import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../styles/admin-dashboard/admin-dashboard.css';
import '../styles/dashboardCharts/dashboard-charts.css';
import InfoCard from './InfoCard';
import MultiBarChart from './MultiBarChart';
import PieChart from './PieChart';

const DashboardCharts = ({username}) => {
  const Dashboard = () => {
    const [adminName, setAdminName] = useState('');

    axios.get(`${process.env.REACT_APP_BACKEND}/admin/profile`)
      .then((response) => {
        const { name } = response.data; // Replace 'name' with the actual property name from your API response
        setAdminName(name);
      })
      .catch((error) => {
        console.error('Error fetching admin name:', error);
      });
  }
  return (
    <div className="dashboard">
      <div className="h2">
        <h2>Welcome {username}, Admin Dashboard!</h2>
      </div>
      

      {/* InfoCard without a border background color */}
      <div className="info-cards">
        <InfoCard />
      </div>

      {/* Center-aligned MultiBarChart */}
      <div className="center-aligned bar-chart">
        <MultiBarChart />
      </div>

      {/* Center-aligned smaller PieChart */}
      <div className=" center-aligned smaller-pie-chart">
        <PieChart />
      </div>
    </div>
  );
};

export default DashboardCharts;
