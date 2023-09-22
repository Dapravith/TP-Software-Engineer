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
            <th>Code</th>
            <th>Products</th>
            <th>Delivery Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.code}>
              <td>{index + 1}</td>
              <td>{item.code}</td>
              <td>{item.products}</td>
              <td>{item.deliveryDate}</td>
              <td className={`status-${item.status}`}>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentlyDeliveredTable;
