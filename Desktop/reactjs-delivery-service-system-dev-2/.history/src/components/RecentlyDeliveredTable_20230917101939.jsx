// RecentlyDeliveredTable.jsx
import React from 'react';
import "../styles/dashboardCharts/dashboard-charts.css";

const RecentlyDeliveredTable = ({ data }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>Recently Delivered</h3>
      </div>
      <table className="recently-delivered-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Package Code</th>
            <th>Products</th>
            <th>Costs</th>
            <th>Delivery Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.code}>
              <td>{index + 1}</td>
              <td>{item.packageCode}</td>
              <td>{item.products}</td>
              <td>{item.costs}</td>
              <td>{item.deliveryDate}</td>
              <td className={`status-${item.status}`}>{item.status}</td>
              <td><button className="action-button">Action</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentlyDeliveredTable;
