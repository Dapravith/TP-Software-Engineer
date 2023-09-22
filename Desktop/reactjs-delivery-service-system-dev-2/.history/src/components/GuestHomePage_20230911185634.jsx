// App.js
import React, { useState } from 'react';
import "../styles/guest-homepage/guest-homepage.css";
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Header from './Header'; // Import the Header component
import Footer from './Footer'; // Import the Footer component

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (searchCriteria) => {
       const results = [
      // Replace with your actual search results
      { id: 1, packageCode: '12345', packageName: 'Package A', phoneNumber: '123-456-7890', finalDestination: 'Destination 1' },
      { id: 2, packageCode: '67890', packageName: 'Package B', phoneNumber: '987-654-3210', finalDestination: 'Destination 2' },
    ];

    setSearchResults(results);
  };

  return (
    <div className="guest-homepage">
      <Header /> {/* Use the Header component */}
      <div className="main-content">
        <h1>Delivery Homepage</h1>
        <SearchBar onSearch={handleSearch} />
        <SearchResults results={searchResults} />
      </div>
      <Footer /> {/* Use the Footer component */}
    </div>
    
 );
}

export default App;
