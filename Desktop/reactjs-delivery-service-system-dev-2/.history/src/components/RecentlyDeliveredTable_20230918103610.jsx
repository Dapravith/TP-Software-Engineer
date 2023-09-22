import React from 'react';
import "../styles/dahboardCharts/dashboard-charts.css";

const RecentlyDeliveredTable = ({ data }) => {
  return (
    <div className="table-container">
      <table className="modern-table">
        <thead>
          <tr>
            <th>Package Code</th>
            <th>Products</th>
            <th>Costs</th>
            <th>Delivery Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            let statusClass = "";
            if (row.status === 'pending') statusClass = "status-pending";
            if (row.status === 'delivered') statusClass = "status-delivered";
            if (row.status === 'returned') statusClass = "status-returned";

            return (
              <tr key={index} className={statusClass}>
                <td>{row.packageCode}</td>
                <td>{row.products}</td>
                <td>{row.costs}</td>
                <td>{row.deliveryDate}</td>
                <td>{row.status}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default RecentlyDeliveredTable;
