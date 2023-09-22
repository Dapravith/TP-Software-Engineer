import React from 'react';
import "../styles/header-homepages/header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzMA8ucxE7_xNcXN6ZnfKtcEwu7m3CoaccEg&usqp=CAU" alt="Logo" />
      </div>
      <nav className="navigation">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
