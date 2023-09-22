import React from 'react';
import "../styles/dashboardCharts/dashboard-charts.css";

const RecentlyDeliveredTable = ({ data }) => {
  return (
    <div className="table-container">
      <table className="modern-table">
        <thead>
          <tr>
            <th>Package Code</th>
            <th>Products</th>
            <th>Destination</th>
            <th>Costs</th>
            <th>Delivery Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.packageCode}</td>
              <td>{row.products}</td>
              <td>{row.destination}</td>
              <td>{row.costs}</td>
              <td>{row.deliveryDate}</td>
              <td className={row.status}>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecentlyDeliveredTable;
