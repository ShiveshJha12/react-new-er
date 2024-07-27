import React from 'react';

const Header = ({ username }) => {
  return (
    <header>
      <h1>ERP Application</h1>
      {username && <p>Welcome, {username}!</p>}
    </header>
  );
};

export default Header;
