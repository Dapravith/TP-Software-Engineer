import React, { useState } from 'react';
import '../styles/dashboardCharts/dashboard-charts.css';

const RecentlyDeliveredTable = ({ data }) => {

  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'

  const sortedData = [...data].sort((a, b) => {
    if (sortField === null) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    let comparison = 0;

    if (aValue > bValue) {
      comparison = 1;
    } else if (aValue < bValue) {
      comparison = -1;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="table-container">
      <h3>Recently Delivered Table</h3>
      <table className="modern-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('packageCode')}>Package Code</th>
            <th onClick={() => handleSort('products')}>Products</th>
            <th onClick={() => handleSort('destination')}>Destination</th>
            <th onClick={() => handleSort('costs')}>Costs</th>
            <th onClick={() => handleSort('deliveryDate')}>Delivery Date</th>
            <th onClick={() => handleSort('status')}>Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map(item => (
            <tr key={item.packageCode}>
              <td>{item.packageCode}</td>
              <td>{item.products}</td>
              <td>{item.destination}</td>
              <td>{item.costs}</td>
              <td>{item.deliveryDate}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default RecentlyDeliveredTable;
