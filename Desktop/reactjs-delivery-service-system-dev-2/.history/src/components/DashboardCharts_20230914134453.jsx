import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../styles/admin-dashboard/admin-dashboard.css';
import '../styles/dashboardCharts/dashboard-charts.css';
import '../styles/responsive/responsive.css';
import InfoCard from './InfoCard';
import MultiBarChart from './MultiBarChart';
import PieChart from './PieChart';

const DashboardCharts = () => {
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    // Make an HTTP GET request to fetch the admin's name from the backend
    axios.get('http://localhost:4000/admin/login')
      .then((response) => {
        setAdminName(response.data.adminName);
      })
      .catch((error) => {
        console.error('Error fetching admin name:', error);
      });
  }, []);
  return (
    <div className="dashboard">
      <header>
        <h2>Welcome, {adminName}!</h2>
      </header>

      {/* Center-aligned InfoCard */}
      <div className="center-aligned info-cards">
        <InfoCard />
      </div>

      {/* Center-aligned MultiBarChart */}
      <div className="center-aligned multi-barchart">
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
