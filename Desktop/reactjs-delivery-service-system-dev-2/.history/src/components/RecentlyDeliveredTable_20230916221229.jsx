// RecentlyDeliveredTable.jsx
import React from 'react';
import "../styles/dashboardCharts/dashboard-charts.css";

const RecentlyDeliveredTable = ({ data }) => {
    return (
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
                {data.map((delivery, index) => (
                    <tr key={delivery.code} className={delivery.status}>
                        <td>{index + 1}</td>
                        <td>{delivery.code}</td>
                        <td>{delivery.products}</td>
                        <td>{delivery.date}</td>
                        <td>{delivery.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default RecentlyDeliveredTable;
