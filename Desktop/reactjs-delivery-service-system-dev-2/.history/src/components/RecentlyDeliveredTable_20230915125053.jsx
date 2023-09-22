import React from 'react';
import '../styles/dashboardCharts/dashboard-charts.css';

function RecentlyDeliveredTable() {
  return (
    <div className="recently-delivered-table">
      <h2 className="table-header">Recently Delivered Packages</h2>
      <div className="table">
        <div className="table-row table-header-row">
          <div className="table-cell">N.o</div>
          <div className="table-cell">Package Code</div>
          <div className="table-cell">Package Name</div>
          <div className="table-cell">Phone Number Sender</div>
          <div className="table-cell">Phone Number Receiver</div>
          <div className="table-cell">Delivered Date</div>
          <div className="table-cell">Arrival Date</div>
          <div className="table-cell">Status</div>
        </div>
        {/* Populate this section with data */}
      </div>
    </div>
  );
}

export default RecentlyDeliveredTable;
