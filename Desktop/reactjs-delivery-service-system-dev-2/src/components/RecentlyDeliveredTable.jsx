import React, { useState, useEffect } from 'react';
import '../styles/dashboardCharts/dashboard-charts.css';
import axios from 'axios';

const RecentlyDeliveredTable = ({ data }) => {
  const ITEMS_PER_PAGE = 10;
   const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const [allBranchOwners, setAllBranchOwners] = useState([]);
  const [displayCount, setDisplayCount] = useState(10); // Initial number of items to display
  const [searchTerm, setSearchTerm] = useState('');
  const sortedItems = [...items].sort((a, b) => new Date(b.deliveryDate) - new Date(a.deliveryDate));

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND}/admin/dashboard/items/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(({ data }) => {
      setItems(data);
    }).catch(err => {
      console.log("Error fetching items", err);
    });

    axios.get(`${process.env.REACT_APP_BACKEND}/admin/dashboard/branch-owners/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(data => {
        setAllBranchOwners(data.data);
    })
    .catch(err => {
        console.log("Error fetching branch owners", err);
    });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when a new search is made
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const filteredItems = sortedItems.filter(item =>
  item.packageCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
  item.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  item.cost.toString().includes(searchTerm) ||
  new Date(item.deliveryDate).toLocaleDateString().includes(searchTerm) ||
  item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  return (
    <div className="table-container">
      <div className="table-header">
        <h3>Recently Delivered Table</h3>
        <div className="search-container">
          <input type="text"  placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
          <button className="search-button">
            <i className="search-icon">🔍</i>
          </button>
        </div>
        </div>
      <table className="modern-table">
        <thead className="table-header">
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
          {filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map(item => (
            <tr key={item._id}>
              <td>{item.packageCode}</td>
              <td>{item.packageName}</td>
              <td>
                {
                  allBranchOwners.length > 0 && allBranchOwners.filter(data => data._id === item.initializeBranchId)[0].city
                }
                &nbsp;→&nbsp;
                {
                  allBranchOwners.length > 0 && allBranchOwners.filter(data => data._id === item.finalBranchId)[0].city
                }
              </td>
              <td>{item.cost}</td>
              <td>{new Date(Number(item.date)).getDate()}/{new Date(Number(item.date)).getMonth() + 1}/{new Date(Number(item.date)).getFullYear()} {new Date(Number(item.date)).getHours() > 12 ? new Date(Number(item.date)).getHours() - 12 < 10 ? "0" + new Date(Number(item.date)).getHours() - 12 : new Date(Number(item.date)).getHours() - 12 : new Date(Number(item.date)).getHours() === 0 ? 12 : new Date(Number(item.date)).getHours() < 10 ? "0" + new Date(Number(item.date)).getHours() : new Date(Number(item.date)).getHours()}:{new Date(Number(item.date)).getMinutes() < 10 ? "0" + new Date(Number(item.date)).getMinutes() : new Date(Number(item.date)).getMinutes()} { new Date(Number(item.date)).getHours() > 12 ? "PM" : "AM"}</td>
              <td className={item.status.toLowerCase()}>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container" style={{ textAlign: 'right' }}>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`page-button ${index + 1 === currentPage ? 'active' : ''}`}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentlyDeliveredTable;
