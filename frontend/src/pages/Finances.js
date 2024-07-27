import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Finances = () => {
  const [finances, setFinances] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/finances')
      .then(response => setFinances(response.data))
      .catch(error => console.error('Error fetching finances:', error));
  }, []);

  return (
    <div>
      <h1>Finance Management</h1>
      <ul>
        {finances.map(finance => (
          <li key={finance.id}>{finance.type} - {finance.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default Finances;
