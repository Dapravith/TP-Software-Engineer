// RecentlyDeliveredTable.jsx
import React from 'react';
import "../styles/dashboardCharts/dashboard-charts.css";

function renderRow(data, index) {
  return (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{data.code}</td>
      <td>{data.products}</td>
      <td>{data.deliveryDate}</td>
      <td className={`status-${data.status}`}>{data.status}</td>
    </tr>
  );
}

function RecentlyDeliveredTable({ data }) {
  return (
    <div className="recently-delivered-table">
      <table>
        <thead>
          <tr>
            <th>N.o</th>
            <th>Code</th>
            <th>Products</th>
            <th>Delivery Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => renderRow(item, index))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentlyDeliveredTable;
