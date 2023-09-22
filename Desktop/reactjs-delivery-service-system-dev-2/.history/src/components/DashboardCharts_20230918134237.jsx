import React, {useEffect, useState} from 'react';
import "../styles/admin-dashboard/admin-dashboard.css";
import "../styles/dashboardCharts/dashboard-charts.css";
import InfoCard from './InfoCard';
import MultiBarChart from './MultiBarChart';
import PieChart from './PieChart';
import RecentlyDeliveredTable from './RecentlyDeliveredTable';
import axios from "axios";


const DashboardCharts = ({ username }) => {
  const [branchOwnerSizes, setBranchOwnerSizes] = useState(0);
  const [itemSizes, setItemSizes] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND}/admin/dashboard/branch-owners/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(data => {
      const branchSizes = data.data.length;
      setBranchOwnerSizes(branchSizes);
    }).catch(err => err);
    
    axios.get(`${process.env.REACT_APP_BACKEND}/admin/dashboard/items/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(data => {
      const itemLength = data.data.length;
      setItemSizes(itemLength);
    })

    axios.get(`${process.env.REACT_APP_BACKEND}/admin/dashboard/histories/all`, {
      header: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(data => {
      console.log(data);
    }).catch(err => {
      return err;
    })
  }, []);



  const deliveries = [
   { packageCode: '0001', products: 'Laptop', destination: 'New York', costs: '$900', deliveryDate: '2023-09-15', status: 'pending' },
    { packageCode: '0002', products: 'Phone', destination: 'Los Angeles', costs: '$500', deliveryDate: '2023-09-14', status: 'delivered' },
    { packageCode: '0003', products: 'Camera', destination: 'Chicago', costs: '$700', deliveryDate: '2023-09-13', status: 'returned' },
    { packageCode: '0004', products: 'Headphones', destination: 'Houston', costs: '$200', deliveryDate: '2023-09-12', status: 'pending' },
    { packageCode: '0005', products: 'Tablet', destination: 'Phoenix', costs: '$300', deliveryDate: '2023-09-10', status: 'delivered' },
    { packageCode: '0006', products: 'Monitor', destination: 'Philadelphia', costs: '$250', deliveryDate: '2023-09-09', status: 'pending' },
    { packageCode: '0007', products: 'Keyboard', destination: 'San Antonio', costs: '$50', deliveryDate: '2023-09-08', status: 'delivered' },
    { packageCode: '0008', products: 'Mouse', destination: 'San Diego', costs: '$20', deliveryDate: '2023-09-07', status: 'pending' }
  ];
  return (
    <div className="dashboard">
      <div className="h2">
        <h2>Welcome {username} To Admin Dashboard!</h2>
      </div>
        {/* InfoCard without a border background color */}
        <div className="info-card">
         <div className="info-card-container">
        <InfoCard title="Total BranchOwner" value={branchOwnerSizes} icon="fa fa-users" color="#3498db" />
        <InfoCard title="Total Items" value={itemSizes} icon="fa fa-shopping-bag" color="#e74c3c" />
        <InfoCard title="Total Incoming Items" value={30} icon="fa fa-shopping-cart" color="#2ecc71" />
        <InfoCard title="Total Pending Items" value={10} icon="fa fa-clock-o" color="#f1c40f" />
        <InfoCard title="Total Delivered Items" value={115} icon="fa fa-truck" color="#9b59b6" />
        <InfoCard title="Total Profits" value={240} icon="fa fa-money" color="#27ae60" />
      </div>
        </div>
      {/* Center-aligned smaller PieChart */}
      <div className="content-container">
        <div className="charts-container">
          <div className="multi-bar-chart">
            <MultiBarChart />
          </div>
          <div className="pie-chart-container">
            <PieChart />
          </div>
        </div>
        <div className="recently-delivered-table">
            <RecentlyDeliveredTable data={deliveries}/>
        </div>
      </div>
    </div>
  );
};


export default DashboardCharts;
