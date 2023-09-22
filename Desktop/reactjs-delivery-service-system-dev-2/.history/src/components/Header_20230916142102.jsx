import React from 'react';

function Header({ toggleTheme }) {
  return (
    <header className="header">
      <h1>Admin Dashboard</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </header>
  );
}

export default Header;
