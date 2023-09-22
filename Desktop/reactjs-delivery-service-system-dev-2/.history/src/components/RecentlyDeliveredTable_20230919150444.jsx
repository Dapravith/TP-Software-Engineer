import React from 'react';
import '../styles/dashboardCharts/dashboard-charts.css'; // Import the CSS

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
          {items.map(item => (
            <tr key={item._id}>
              <td>{item.packageCode}</td>
              <td>{item.products.join(', ')}</td>
              <td>{item.destinations}</td>
              <td>{item.costs}</td>
              <td>{new Date(item.deliveryDate).toLocaleDateString()}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecentlyDeliveredTable;
