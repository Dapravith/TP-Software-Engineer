import React from 'react';
import "../styles/dashboardCharts/dashboard-charts.css";

const SummaryTable = () => {
  return (
    <div className="summary-table-container">
      <h2>Delivery Summary</h2>
      <table className="summary-table">
        <thead>
          <tr>
            <th>N.o</th>
            <th>PackageCode</th>
            <th>PackageName</th>
            <th>PhoneNumber Sender</th>
            <th>PhoneNumber Receiver</th>
            <th>Delivered Date</th>
            <th>Arrival Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample data rows */}
          <tr>
            <td>1</td>
            <td>PKG001</td>
            <td>Package 1</td>
            <td>123-456-7890</td>
            <td>987-654-3210</td>
            <td>2023-09-13</td>
            <td>2023-09-12</td>
            <td>Delivered</td>
          </tr>
          <tr>
            <td>2</td>
            <td>PKG002</td>
            <td>Package 2</td>
            <td>111-222-3333</td>
            <td>444-555-6666</td>
            <td>2023-09-14</td>
            <td>2023-09-13</td>
            <td>Pending</td>
          </tr>
          <tr>
            <td>3</td>
            <td>PKG003</td>
            <td>Package 3</td>
            <td>777-888-9999</td>
            <td>111-222-3333</td>
            <td>2023-09-15</td>
            <td>2023-09-14</td>
            <td>Incoming</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SummaryTable;
