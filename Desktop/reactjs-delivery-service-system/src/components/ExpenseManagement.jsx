import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import axios from 'axios';

const AdminDashboard = () => {
  const [branchFinancialData, setBranchFinancialData] = useState([]);

  useEffect(() => {
    // Fetch the Income and Expense data for branch owners from your backend
    axios.get(`${process.env.REACT_APP_BACKEND}/admin/dashboard/branch-financial`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => {
        setBranchFinancialData(response.data);
    })
    .catch(err => {
        console.log("Error fetching branch financial data", err);
    });
  }, []);

  return (
    <div>
      <BarChart width={800} height={400} data={branchFinancialData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="branchName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Income" fill="#82ca9d" />
        <Bar dataKey="Expense" fill="#ff7f50" />
      </BarChart>
    </div>
  );
};

export default AdminDashboard;
