import React, { useState, useEffect } from 'react';
import '../styles/dashboardCharts/dashboard-charts.css';
import axios from 'axios';

const RecentlyDeliveredTable = ({ data }) => {
  const ITEMS_PER_PAGE = 10;
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const [allBranchOwners, setAllBranchOwners] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);
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
};

  const formatDate = (date) => {
  const d = new Date(Number(date));
  const hours = d.getHours() > 12 ? d.getHours() - 12 : d.getHours() === 0 ? 12 : d.getHours();
  const minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  const ampm = d.getHours() > 12 ? "PM" : "AM";
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${hours < 10 ? "0" + hours : hours}:${minutes} ${ampm}`;
};


  const handleSearchClick = () => {
    setIsLoading(true);
    setSearchClicked(true);
    setCurrentPage(1);
     setTimeout(() => {
    setIsLoading(false);
  }, 1000);
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const filteredItems = sortedItems.filter(item => {
  if (searchTerm) {
    return (
      item.packageCode === searchTerm ||
      item.packageName.toLowerCase() === searchTerm.toLowerCase() ||
      item.cost.toString() === searchTerm ||
      new Date(item.deliveryDate).toLocaleDateString() === searchTerm ||
      item.status.toLowerCase() === searchTerm.toLowerCase()
    );
  }
  return true; // If no search term, show all items
});

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  return (
  <div className="table-container">
    {isLoading ? (
      <div className="spinner"></div>
    ) : (
      <>
        <div className="table-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Recently Delivered Table</h3>
          <div className="search-container" style={{ display: 'flex', alignItems: 'center' }}>
            <input type="text"  placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
            <button className="search-button-long" onClick={handleSearchClick}>
              Search
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
                <td>{formatDate(item.date)}</td>
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
      </>
    )}
  </div>
);
};

export default RecentlyDeliveredTable;
