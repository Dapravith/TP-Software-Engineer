import axios from 'axios';
import React, {useEffect, useState} from 'react';
import "../styles/admin-dashboard/admin-dashboard.css";
import "../styles/dashboardCharts/dashboard-charts.css";
import InfoCard from './InfoCard';
import MultiBarChart from './MultiBarChart';
import PieChart from './PieChart';
import DashboardData from '../api/data.js';

const DashboardCharts = ({ username }) => {
  const [branchOwners, setBranchOwners] = useState([]);
  const [branchOwnerItems, setBranchOwnerItems] = useState([]);
  const [incomingItems, setIncomingItems] = useState([]);
  const [pendingItems, setPendingItems] = useState([]);
  const [deliveredItems, setDeliveredItems] = useState([]);
  const [profits, setProfits] = useState([]);
  useEffect(() => {
    // Fetch branch owner data
    axios
      .get(`${process.env.REACT_APP_BACKEND}/branch-owner/all`)
      .then((response) => {
        setBranchOwners(response.data);
      })
      .catch((error) => {
        console.error('Error fetching branch owner data:', error);
      });

    // Fetch branch owner items data
    axios
      .get(`${process.env.REACT_APP_BACKEND}/branch-owner/items`)
      .then((response) => {
        setBranchOwnerItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching branch owner items data:', error);
      });

    // Fetch incoming items data
    axios
      .get(`${process.env.REACT_APP_BACKEND}/branch-owner/incoming-items`)
      .then((response) => {
        setIncomingItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching incoming items data:', error);
      });

    // Fetch pending items data
    axios
      .get(`${process.env.REACT_APP_BACKEND}/branch-owner/pending-items`)
      .then((response) => {
        setPendingItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching pending items data:', error);
      });

    // Fetch delivered items data
    axios
      .get(`${process.env.REACT_APP_BACKEND}/branch-owner/delivered-items`)
      .then((response) => {
        setDeliveredItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching delivered items data:', error);
      });

    // Fetch profits data
    axios
      .get(`${process.env.REACT_APP_BACKEND}/branch-owner/profits`)
      .then((response) => {
        setProfits(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profits data:', error);
      });
  })
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
    </div>
  );
};

export default DashboardCharts;
