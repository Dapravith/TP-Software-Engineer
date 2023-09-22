import React from 'react';
import "../src/styles/DashboardCharts/dashboard-charts.css";

const InfoCard = ({ data }) => {
  return (
    <div className="info-card">
      <div className="info-item">
        <i className="fa fa-users"></i>
        <h3>Total Branch Owners</h3>
        <p>{data.totalBranchOwners}</p>
      </div>

      <div className="info-item">
        <i className="fa fa-cube"></i>
        <h3>Total Products</h3>
        <p>{data.totalProducts}</p>
      </div>

      <div className="info-item">
        <i className="fa fa-truck"></i>
        <h3>Total Incoming Items</h3>
        <p>{data.totalIncomingItems}</p>
      </div>

      <div className="info-item">
        <i className="fa fa-clock-o"></i>
        <h3>Total Pending Items</h3>
        <p>{data.totalPendingItems}</p>
      </div>

      <div className="info-item">
        <i className="fa fa-check"></i>
        <h3>Total Delivered Items</h3>
        <p>{data.totalDeliveredItems}</p>
      </div>

      <div className="info-item">
        <i className="fa fa-money"></i>
        <h3>Total Profits</h3>
        <p>{data.totalProfits}</p>
      </div>
    </div>
  );
};

export default InfoCard;
