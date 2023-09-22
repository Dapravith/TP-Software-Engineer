import React from 'react';
import axios from 'axios';
import '../styles/admin-dashboard/admin-dashboard.css';
import '../styles/dashboardCharts/dashboard-charts.css';
import InfoCard from './InfoCard';
import MultiBarChart from './MultiBarChart';
import PieChart from './PieChart';

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
      <div>
      {/* Render the fetched data here */}
      <h3>Branch Owners:</h3>
      <ul>
        {branchOwners.map((owner) => (
          <li key={owner.id}>{owner.name}</li>
        ))}
      </ul>

      <h3>Branch Owner Items:</h3>
      <ul>
        {branchOwnerItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      <h3>Incoming Items:</h3>
      <ul>
        {incomingItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      <h3>Pending Items:</h3>
      <ul>
        {pendingItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      <h3>Delivered Items:</h3>
      <ul>
        {deliveredItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      <h3>Profits:</h3>
      <ul>
        {profits.map((profit) => (
          <li key={profit.id}>{profit.amount}</li>
        ))}
      </ul>
    </div>
      <div className="h2">
        <h2>Welcome {username} To Admin Dashboard!</h2>
      </div>
      
      {/* Separate div for InfoCard */}
      <div className="info-card-container">
        {/* InfoCard without a border background color */}
        <div className="info-cards">
          <InfoCard />
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
