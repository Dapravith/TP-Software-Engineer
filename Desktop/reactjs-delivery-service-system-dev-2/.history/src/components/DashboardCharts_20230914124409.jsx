import React, { useEffect, useState } from 'react';
import '../styles/admin-dashboard/admin-dashboard.css';
import '../styles/dashboardCharts/dashboard-charts.css';
import InfoCard from './InfoCard';
import MultiBarChart from './MultiBarChart';
import PieChart from './PieChart';

const DashboardCharts = ({ adminName }) => {
  return (
    <div className="dashboard">
      <header className="admin-header">
        <h2>Welcome, {adminName}!</h2>
      </header>

      {/* InfoCard without a border background color */}
      <div className="info-cards">
        <InfoCard />
      </div>

      {/* Center-aligned MultiBarChart */}
      <div className="center-aligned">
        <MultiBarChart />
      </div>

      {/* Center-aligned smaller PieChart */}
      <div className="center-aligned smaller-pie-chart">
        <PieChart />
      </div>
    </div>
  );
};

const App = () => {
  // State to store the admin's name fetched from the backend
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    // Fetch the admin's name from the backend API
    fetch('http://localhost:4000/admin/login')
      .then((response) => response.json())
      .then((data) => {
        // Set the admin's name in the state
        setAdminName(data.adminName);
      })
      .catch((error) => {
        console.error('Error fetching admin name:', error);
      });
  }, []);

  return (
    <div className="app">
      {/* Pass the admin's name as a prop to the DashboardCharts component */}
      <DashboardCharts adminName={adminName} />
    </div>
  );
};

export default App;
