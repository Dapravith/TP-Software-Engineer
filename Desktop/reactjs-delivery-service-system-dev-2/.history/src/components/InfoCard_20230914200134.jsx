import React, { useState, useEffect } from 'react';
import '../styles/DashboardCharts/dashboard-charts.css';

const InfoCard = () => {
  // Initialize state for data (replace with actual data)
  const [data, setData] = useState({
    totalBranchOwners: 0,
    totalProducts: 0,
    totalIncomingItems: 0,
    totalPendingItems: 0,
    totalDeliveredItems: 0,
    totalProfits: 0,
  });

  // Simulate fetching data from an API (replace with actual API calls)
  useEffect(() => {
    // Replace this with your actual API endpoint
    fetch(`${process.env.REACT_APP_BACKEND}/branch-owner/all`)
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="info-card">
      <div className="info-icon">
        <i className="fa fa-users"></i>
      </div>
      <div className="info-details">
        <h3>Total Branch Owners</h3>
        <p>{data.totalBranchOwners}</p>
      </div>
      {/* Repeat this structure for other data */}
    </div>
  );
};

export default InfoCard;
