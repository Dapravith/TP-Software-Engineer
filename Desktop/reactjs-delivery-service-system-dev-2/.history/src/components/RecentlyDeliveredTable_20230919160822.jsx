import React, {useState, useEffect} from 'react';
import '../styles/dashboardCharts/dashboard-charts.css';
import axios from 'axios';

const RecentlyDeliveredTable = ({ data }) => {
  const [items, setItems] = useState([]);
  const [branch-owners, setbranch-owners] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND}/admin/dashboard/items/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(data => {
      setItems(data.data)
    })

    axios.get(`${process.env.REACT_APP_BACKEND}/admin/branch-owners/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(data => {
      setBranchOwner(data.data)
    })
  }, [])

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
              <td>{item.destination}</td>
              <td>{item.cost}</td>
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
