import React, { useState, useEffect } from 'react';
import '../styles/dashboardCharts/dashboard-charts.css';
import axios from 'axios';

const RecentlyDeliveredTable = ({ data }) => {
    const [items, setItems] = useState([]);
    const [allBranchOwners, setAllBranchOwners] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND}/admin/dashboard/items/all`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(data => {
            setItems(data.data);
        }).catch(err => {
            console.error("Error fetching items", err);
        });

        axios.get(`${process.env.REACT_APP_BACKEND}/admin/branch-owners/all`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(data => {
            setAllBranchOwners(data.data);
        }).catch(err => {
            console.error("Error fetching branch owners", err);
        });
    }, []);

    const getCityByBranchId = (branchId) => {
        const branch = allBranchOwners.find(b => b._id === branchId);
        return branch ? branch.city : '';
    };

    return (
        <div className="table-container">
            <table className="modern-table">
                <thead>
                    <tr>
                        <th>Package Code</th>
                        <th>Package Name</th>
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
                            <td>{item.packageName}</td>
                            <td>{getCityByBranchId(item.initializeBranchId)} -> {getCityByBranchId(item.finalBranchId)}</td>
                            <td>{item.cost}</td>
                            <td>{new Date(item.deliveryDate).toLocaleDateString()}</td>
                            <td>{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RecentlyDeliveredTable;
